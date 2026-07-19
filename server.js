// server.js — unified server for WeddingCards + AICardDesign
// Serves:
//   /                         -> WeddingCards landing page + template gallery
//   /templates/*              -> the 9 finished wedding-card templates (static)
//   /ai-design/                -> AICardDesign step-by-step section builder
//   /ai-design/sections/*      -> raw section design assets (static, if needed)
//   /api/sections/:type/:id?  -> AICardDesign's design-list / design-detail API
//   /api/card                 -> simple JSON-file-backed card lookup/save (stub
//                                 for the /api/card?slug=... call already present
//                                 in the WeddingCards landing page)

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { generateSectionUpdates, generateSectionUpdatesStream, applyUpdatesToTemplate } = require('./lib/ai');
const { getPool } = require('./lib/db');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const WEDDING_CARDS_DIR = path.join(__dirname, 'public', 'wedding-cards');
const AI_DESIGN_DIR = path.join(__dirname, 'public', 'ai-card-design');
const SECTIONS_DIR = path.join(AI_DESIGN_DIR, 'sections');
const CARDS_DB_PATH = path.join(__dirname, 'data', 'cards.json');

// ---------------------------------------------------------------------------
// Static hosting
// ---------------------------------------------------------------------------
// WeddingCards is the main site, mounted at "/"
app.use(express.static(WEDDING_CARDS_DIR));

// AICardDesign (the modular section-based builder) lives at /ai-design
app.use('/ai-design', express.static(AI_DESIGN_DIR));

// ---------------------------------------------------------------------------
// AICardDesign API — read every design .js file inside sections/<sectionType>/
// (ported from the original acd/server.js, unchanged behaviour)
// ---------------------------------------------------------------------------
function loadDesigns(sectionType) {
  const dir = path.join(SECTIONS_DIR, sectionType);
  if (!fs.existsSync(dir)) {
    console.warn(`Section folder not found: ${dir}`);
    return [];
  }
  
  const designs = [];
  
  // Load designs from root section folder
  try {
    const rootDesigns = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.js'))
      .map((file) => {
        const fullPath = path.join(dir, file);
        delete require.cache[require.resolve(fullPath)];
        return require(fullPath);
      });
    designs.push(...rootDesigns);
  } catch (err) {
    console.error(`Error loading root designs for ${sectionType}:`, err);
  }
  
  return designs;
}

// AI-generated designs (saved via /api/ai/save-section) live in Postgres,
// not on disk — Railway's filesystem is ephemeral, so writing files here
// would vanish on the next deploy. They're merged in at request time so
// the existing frontend (which just calls /api/sections/:type) picks them
// up automatically, no client changes needed.
async function loadAiDesigns(sectionType) {
  try {
    const pool = getPool();
    const { rows } = await pool.query(
      `select id, label, fields, defaults, html, css, js
       from ai_designs where section_type = $1
       order by created_at desc`,
      [sectionType]
    );
    return rows.map((r) => ({
      id: r.id,
      label: `${r.label} (AI)`,
      fields: r.fields,
      defaults: r.defaults,
      html: r.html,
      css: r.css,
      js: r.js,
    }));
  } catch (err) {
    // Don't let a DB hiccup take down the whole design list — just fall
    // back to file-based designs only.
    console.warn(`Could not load AI designs for "${sectionType}":`, err.message);
    return [];
  }
}

app.get('/api/sections/:sectionType/:designId?', async (req, res) => {
  const { sectionType, designId } = req.params;
  const designs = [...loadDesigns(sectionType), ...(await loadAiDesigns(sectionType))];

  if (designId) {
    const design = designs.find((d) => d.id === designId);
    if (!design) {
      return res.status(404).json({ error: `Design '${designId}' not found in section '${sectionType}'` });
    }
    // Normalize the same way as the list response below — the raw design
    // files only export `name`, not `label`, so without this the dropdown
    // option text (which reads d.label) ends up "undefined" for every item.
    return res.json({
      ...design,
      label: design.label || design.name || 'Unnamed Design',
      fields: design.fields || [],
      defaults: design.defaults || {},
      colors: design.colors || {},
      html: design.html || '',
      css: design.css || '',
      js: design.js || ''
    });
  }

  // Return full design objects (not just id/label) so the dropdowns can
  // populate fields/html/css/js without needing a second fetch call.
  return res.json(designs.map((d) => ({
    id: d.id,
    label: d.label || d.name || 'Unnamed Design',
    fields: d.fields || [],
    defaults: d.defaults || {},
    colors: d.colors || {},
    html: d.html || '',
    css: d.css || '',
    js: d.js || ''
  })));
});

// ---------------------------------------------------------------------------
// AI section editing — NVIDIA API (see lib/ai.js) returns a small validated
// JSON diff (textUpdates/colorUpdates/animationUpdates) against whichever
// base template the user currently has selected for that section. The
// model never generates HTML/CSS/JS itself; the server always resolves the
// real template first and merges the diff into a copy of it via
// applyUpdatesToTemplate, so every AI edit is scoped to the section's
// existing editable area instead of a full rewrite.
// ---------------------------------------------------------------------------

// Looks up a hand-written design file by id across every section-type
// folder under sections/. Used to resolve the base template an AI edit
// request should be applied to (shared by both the plain and streaming
// generate endpoints below).
function findTemplateById(sectionType, templateId) {
  if (!templateId) return null;
  const dir = path.join(SECTIONS_DIR, sectionType);
  if (!fs.existsSync(dir)) return null;
  
  // Search in root section folder
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.js')) continue;
    const filePath = path.join(dir, file);
    try {
      delete require.cache[require.resolve(filePath)];
      const design = require(filePath);
      if (design.id === templateId) return design;
    } catch {
      // skip files that fail to load
    }
  }
  return null;
}

const aiRateLimit = new Map(); // ip -> [timestamps]  (swap for Redis/Upstash if you outgrow single-instance)
function checkAiRateLimit(ip) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const max = 6;
  const timestamps = (aiRateLimit.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= max) return false;
  timestamps.push(now);
  aiRateLimit.set(ip, timestamps);
  return true;
}

app.post('/api/ai/generate-section', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  if (!checkAiRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many AI generation requests. Please wait a few minutes and try again.' });
  }

  const { sectionType, prompt, currentContent, templateId } = req.body || {};
  if (!sectionType || !prompt) {
    return res.status(400).json({ error: 'sectionType and prompt are required' });
  }
  if (!templateId) {
    return res.status(400).json({ error: 'templateId is required — select a base design for this section before asking AI to edit it' });
  }

  const template = findTemplateById(sectionType, templateId);
  if (!template) {
    return res.status(404).json({ error: `Template '${templateId}' not found in section '${sectionType}'` });
  }

  try {
    const { updates, dropped } = await generateSectionUpdates({ sectionType, prompt, currentContent, template });
    const result = applyUpdatesToTemplate(template, updates);
    return res.json({ ok: true, updates, dropped, result, templateId: template.id });
  } catch (err) {
    console.error('AI generation failed:', err.message, err.details || '');
    return res.status(422).json({ error: err.message, details: err.details });
  }
});

// ---------------------------------------------------------------------------
// Streaming counterpart of /api/ai/generate-section. Streams the model's raw
// output live via Server-Sent Events (so the client can show real-time
// progress instead of waiting on one big request), then — once the full
// response has arrived and been validated — merges the resulting
// text/color/animation updates into the selected base template on the
// server and sends back the same merged { html, css, js } shape the plain
// endpoint returns. Event payloads:
//   { type: 'chunk', text }                      — a fragment of raw model output
//   { type: 'done', updates, dropped, result }    — final validated + merged result
//   { type: 'error', error, details? }            — generation failed
// ---------------------------------------------------------------------------
app.post('/api/ai/generate-section-stream', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  if (!checkAiRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many AI generation requests. Please wait a few minutes and try again.' });
  }

  const { sectionType, prompt, currentContent, templateId } = req.body || {};
  if (!sectionType || !prompt) {
    return res.status(400).json({ error: 'sectionType and prompt are required' });
  }
  if (!templateId) {
    return res.status(400).json({ error: 'templateId is required — select a base design for this section before asking AI to edit it' });
  }

  const template = findTemplateById(sectionType, templateId);
  if (!template) {
    return res.status(404).json({ error: `Template '${templateId}' not found in section '${sectionType}'` });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // disable proxy buffering (nginx et al) so chunks flush immediately
  });
  if (res.flushHeaders) res.flushHeaders();

  const send = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  // Keep the connection alive through any idle gaps between tokens.
  const heartbeat = setInterval(() => res.write(': ping\n\n'), 15000);

  req.on('close', () => clearInterval(heartbeat));

  try {
    const { updates, dropped } = await generateSectionUpdatesStream({
      sectionType,
      prompt,
      currentContent,
      template,
      onChunk: (text) => send({ type: 'chunk', text }),
    });
    const result = applyUpdatesToTemplate(template, updates);
    send({ type: 'done', updates, dropped, result, templateId: template.id });
  } catch (err) {
    console.error('AI generation (stream) failed:', err.message, err.details || '');
    send({ type: 'error', error: err.message, details: err.details });
  } finally {
    clearInterval(heartbeat);
    res.end();
  }
});

app.post('/api/ai/save-section', async (req, res) => {
  const { sectionType, design, prompt } = req.body || {};
  if (!sectionType || !design || !design.id) {
    return res.status(400).json({ error: 'sectionType and a valid design are required' });
  }

  try {
    const pool = getPool();
    await pool.query(
      `insert into ai_designs (id, section_type, label, fields, defaults, html, css, js, prompt, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, now())
       on conflict (id) do update set
         label = excluded.label,
         fields = excluded.fields,
         defaults = excluded.defaults,
         html = excluded.html,
         css = excluded.css,
         js = excluded.js,
         prompt = excluded.prompt,
         updated_at = now()`,
      [
        design.id,
        sectionType,
        design.label,
        JSON.stringify(design.fields || []),
        JSON.stringify(design.defaults || {}),
        design.html || '',
        design.css || '',
        design.js || '',
        prompt || null,
      ]
    );
    return res.json({ ok: true, id: design.id });
  } catch (err) {
    console.error('Saving AI design failed:', err);
    return res.status(500).json({ error: 'Failed to save design. Has db/schema.sql been applied (node scripts/migrate.js)?' });
  }
});

// ---------------------------------------------------------------------------
// Image upload -> imgbb
// Keeps the imgbb API key server-side only (set IMGBB_API_KEY in Railway's
// environment variables). The client sends the picked file as multipart
// form-data under the "image" field and gets back a hosted URL to store.
// ---------------------------------------------------------------------------
app.post('/api/upload-image', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Invalid image upload' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'IMGBB_API_KEY is not configured on the server' });
    }

    try {
      const base64Image = req.file.buffer.toString('base64');
      const body = new URLSearchParams();
      body.append('key', apiKey);
      body.append('image', base64Image);

      const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body,
      });
      const imgbbData = await imgbbRes.json();

      if (!imgbbRes.ok || !imgbbData.success) {
        console.error('imgbb upload failed:', imgbbData);
        return res.status(502).json({ error: 'imgbb upload failed' });
      }

      return res.json({
        url: imgbbData.data.url,
        deleteUrl: imgbbData.data.delete_url,
      });
    } catch (uploadErr) {
      console.error('Image upload error:', uploadErr);
      return res.status(500).json({ error: 'Image upload failed' });
    }
  });
});

// ---------------------------------------------------------------------------
// Card storage — very small JSON-file "database" so the existing
// `/api/card?slug=...` fetch on the WeddingCards landing page has something
// real to talk to. Good enough for a demo; swap for Postgres/Mongo (Railway
// has one-click Postgres) once you need real persistence, since the
// filesystem is reset on every Railway redeploy.
// ---------------------------------------------------------------------------
function readCardsDB() {
  try {
    return JSON.parse(fs.readFileSync(CARDS_DB_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function writeCardsDB(db) {
  fs.mkdirSync(path.dirname(CARDS_DB_PATH), { recursive: true });
  fs.writeFileSync(CARDS_DB_PATH, JSON.stringify(db, null, 2));
}

// GET /api/card?slug=some-couple  -> { status: 'draft' | 'published' | 'not_found', template_id }
app.get('/api/card', (req, res) => {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug query param is required' });

  const db = readCardsDB();
  const card = db[slug];
  if (!card) return res.json({ status: 'not_found' });

  return res.json(card);
});

// POST /api/card  { slug, template_id, status, data } -> saves/updates a card
app.post('/api/card', (req, res) => {
  const { slug, template_id, status = 'draft', data = {} } = req.body || {};
  if (!slug || !template_id) {
    return res.status(400).json({ error: 'slug and template_id are required' });
  }

  const db = readCardsDB();
  db[slug] = { slug, template_id, status, data, updatedAt: new Date().toISOString() };
  writeCardsDB(db);

  return res.json(db[slug]);
});

// ---------------------------------------------------------------------------
// Slug fallback — a published invitation lives at a plain URL like
// "yoursite.com/john-jane", which isn't a real file on disk. express.static
// above only serves files that exist, so anything else falls through to
// here: if it looks like a slug (no dot, so not a request for a missing
// .css/.js/.png etc.) and isn't under /api, /ai-design, or /templates, serve
// the WeddingCards index.html so its client-side script can look the slug
// up via /api/card and redirect to the right template.
// ---------------------------------------------------------------------------
app.get(/^\/(?!api|ai-design|templates)[^./]+$/, (req, res) => {
  res.sendFile(path.join(WEDDING_CARDS_DIR, 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Wedding Card App running on port ${PORT}`);
  console.log(`  WeddingCards site:  http://localhost:${PORT}/`);
  console.log(`  AICardDesign tool:  http://localhost:${PORT}/ai-design/`);
});
