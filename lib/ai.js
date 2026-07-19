// lib/ai.js — AI-powered content/color/style updater for wedding sections
//
// The AI is deliberately NOT allowed to invent new HTML/CSS/JS. It can only
// return a small JSON "diff" against the section that's currently selected
// and being edited:
//
//   - textUpdates:      { fieldKey: "new text", ... }        (existing {{fieldKey}} placeholders only)
//   - colorUpdates:      { "--css-variable-name": "#hex", ... } (existing :root variables only)
//   - animationUpdates:  { elementId: { animation, duration, timing }, ... } (existing element ids only)
//
// The server (see server.js) resolves the base template the user currently
// has selected, tells the model exactly which field keys / CSS variables /
// element ids exist on it, and then merges the model's JSON diff into that
// template — it never lets the model rewrite the template from scratch.
// This keeps every AI edit scoped to the "editable area" of the design
// instead of risking a full, unpredictable rewrite.
//
// CSS VARIABLE NAMING CONVENTION (for AI clarity):
// To prevent the AI from accidentally overwriting unrelated colors, use these
// descriptive variable name patterns:
//   - --bg-page         : Main page background color
//   - --bg-card         : Card/container background color
//   - --bg-overlay      : Overlay/backdrop background color
//   - --text-primary    : Main heading/primary text color
//   - --text-secondary  : Subtitle/secondary text color
//   - --text-muted      : Caption/muted text color
//   - --accent-gold     : Gold accent color (borders, decorations)
//   - --accent-gold-light : Lighter gold variant
//   - --accent-primary  : Primary brand/accent color
//   - --border-color    : Border color for cards/elements
//   - --shadow-color    : Shadow color (usually rgba)

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';
const DEFAULT_MODEL = process.env.AI_DESIGN_MODEL || 'mistralai/mistral-small-4-119b-2603';
const MAX_COMPLETION_TOKENS = 1500;

// Validation patterns for safe updates
const SAFE_HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
const SAFE_ANIMATION_NAME = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const SAFE_DURATION = /^[0-9]+(\.[0-9]+)?(ms|s)$/;

/**
 * Base system prompt. The concrete list of editable field keys / CSS
 * variables / element ids for the template being edited is appended to this
 * at request time (see buildSystemPrompt), so the model only ever sees (and
 * can only reference) things that actually exist in the section.
 */
const UPDATE_SYSTEM_PROMPT_BASE = `You are an AI assistant that customizes ONE existing wedding-website section by returning a small JSON of updates. You are editing an existing, already-designed template — you are NOT designing a new one.

Return ONLY a JSON object with these possible properties, all optional:

{
  "textUpdates": {
    "fieldKey": "new text content"
  },
  "colorUpdates": {
    "--css-variable-name": "#hexcolor"
  },
  "animationUpdates": {
    "elementId": {
      "animation": "animationName",
      "duration": "1s",
      "timing": "ease-in-out"
    }
  }
}

STRICT RULES:
1. Output ONLY the raw JSON object — no markdown, no code fences, no commentary before or after.
2. "textUpdates" keys MUST be one of the exact field keys listed below under EDITABLE FIELDS. Never invent a new key.
3. "colorUpdates" keys MUST be one of the exact CSS variable names listed below under EDITABLE COLORS. Never invent a new variable, and never touch anything outside of those variables.
4. "animationUpdates" keys MUST be one of the exact element ids listed below under EDITABLE ELEMENTS.
5. Colors must be valid hex (#RGB, #RRGGBB, or #RRGGBBAA).
6. Animation "duration" must look like "0.5s" or "300ms"; "animation" must be a plain CSS-safe identifier.
7. Only include properties you are actually changing. Omit anything you're not updating — don't restate unchanged values.
8. Never include "html", "css", or "js" keys, and never return full markup or stylesheets. You are only ever allowed to return the small diff object above.
9. If the user's request can't be satisfied with the available fields/variables/elements, do the closest reasonable thing using only what's available, rather than inventing new ones.
10. IMPORTANT: When changing colors, ONLY modify the specific CSS variable that matches what the user wants to change. For example:
    - If user says "change background color", only modify --bg-page or --bg-card (NOT text colors)
    - If user says "change text color", only modify --text-primary or --text-secondary (NOT background colors)
    - If user says "change accent color", only modify --accent-gold or --accent-primary (NOT backgrounds or text)
11. Each CSS variable controls ONE specific visual element. Never change multiple unrelated variables unless explicitly asked.`;

function buildSystemPrompt({ fieldKeys, cssVariables, elementIds }) {
  const lines = [UPDATE_SYSTEM_PROMPT_BASE];

  lines.push('\nEDITABLE FIELDS (valid "textUpdates" keys):');
  lines.push(
    fieldKeys.length
      ? fieldKeys.map((f) => `- ${f.key}${f.label ? ` ("${f.label}")` : ''}${f.current ? ` — currently: ${JSON.stringify(f.current)}` : ''}`).join('\n')
      : '(none — do not return textUpdates)'
  );

  lines.push('\nEDITABLE COLORS (valid "colorUpdates" keys) - Each controls ONE specific element:');
  lines.push(
    cssVariables.length
      ? cssVariables.map((v) => `- ${v.name} — controls: ${getVariableDescription(v.name)} — currently: ${v.value}`).join('\n')
      : '(none — do not return colorUpdates)'
  );

  lines.push('\nEDITABLE ELEMENTS (valid "animationUpdates" keys):');
  lines.push(elementIds.length ? elementIds.map((id) => `- ${id}`).join('\n') : '(none — do not return animationUpdates)');

  return lines.join('\n');
}

/**
 * Get a human-readable description of what each CSS variable controls
 * This helps the AI understand exactly what will change when it modifies a variable
 */
function getVariableDescription(varName) {
  const descriptions = {
    '--bg-page': 'main page background',
    '--bg-dark': 'dark background areas',
    '--bg-mid': 'mid-tone background sections',
    '--bg-card': 'card/container backgrounds',
    '--bg-overlay': 'overlay/backdrop layers',
    '--text-primary': 'main headings and primary text',
    '--text-secondary': 'subtitles and secondary text',
    '--text-muted': 'captions and muted/greyed text',
    '--c-ivory': 'ivory/cream colored text',
    '--accent-gold': 'gold accents, borders, and decorations',
    '--accent-gold-light': 'light gold highlights',
    '--accent-primary': 'primary brand/accent color',
    '--c-primary': 'primary color elements',
    '--c-primary-light': 'lighter primary color variants',
    '--c-gold': 'gold color elements',
    '--c-gold-light': 'light gold color elements',
    '--border-color': 'borders on cards and elements',
    '--shadow-color': 'drop shadows'
  };
  return descriptions[varName] || 'related styled elements';
}

/**
 * Call NVIDIA API (non-streaming) for AI updates
 */
async function callNvidia(apiKey, systemPrompt, userPrompt) {
  const res = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: MAX_COMPLETION_TOKENS,
      top_p: 1,
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`NVIDIA API error ${res.status}: ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content;
  if (!content) throw new Error('NVIDIA API returned no content');

  if (choice?.finish_reason === 'length') {
    const err = new Error(
      'The AI response was cut off before it finished (hit the token limit). ' +
      'Try a shorter/simpler request, or retry.'
    );
    err.truncated = true;
    err.rawContent = content;
    throw err;
  }

  return content;
}

// Streaming variant of callNvidia. Same request, but with stream: true —
// NVIDIA's endpoint is OpenAI-compatible, so the response body is a
// text/event-stream of `data: {...}\n\n` lines, each carrying a
// choices[0].delta.content fragment, terminated by a literal `data: [DONE]`
// line. onChunk(text) is invoked for every fragment as it arrives so a
// caller (e.g. an SSE endpoint) can forward it to a client in real time.
// Resolves with the full concatenated content once the stream ends, so
// callers can run the usual JSON-parse + validation on it.
async function callNvidiaStream(apiKey, systemPrompt, userPrompt, onChunk) {
  const res = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: MAX_COMPLETION_TOKENS,
      top_p: 1,
      stream: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`NVIDIA API error ${res.status}: ${text.slice(0, 500)}`);
  }
  if (!res.body) {
    throw new Error('NVIDIA API returned no response body for streaming request');
  }

  let content = '';
  let finishReason = null;
  let buffer = '';

  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line; process whatever complete
    // frames we've accumulated so far and keep the remainder for next read.
    let sep;
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);

      for (const line of frame.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === '[DONE]') continue;

        let parsed;
        try {
          parsed = JSON.parse(payload);
        } catch {
          continue; // ignore malformed/partial frames
        }

        const choice = parsed.choices?.[0];
        const delta = choice?.delta?.content;
        if (delta) {
          content += delta;
          if (onChunk) onChunk(delta);
        }
        if (choice?.finish_reason) finishReason = choice.finish_reason;
      }
    }
  }

  if (!content) throw new Error('NVIDIA API returned no content');

  if (finishReason === 'length') {
    const err = new Error(
      'The AI response was cut off before it finished (hit the token limit). ' +
      'Try a shorter/simpler request, or retry.'
    );
    err.truncated = true;
    err.rawContent = content;
    throw err;
  }

  return content;
}

/**
 * Extract a JSON object out of a raw model response, tolerating stray
 * markdown code fences or extra commentary around the JSON.
 */
function extractJSON(text) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  let raw = fencedMatch ? fencedMatch[1].trim() : text.trim();

  const jsonStart = raw.indexOf('{');
  const jsonEnd = raw.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    raw = raw.substring(jsonStart, jsonEnd + 1);
  }

  try {
    return JSON.parse(raw);
  } catch (parseError) {
    console.error('Failed to parse JSON from AI response:');
    console.error('Raw response preview:', text.substring(0, 500));
    throw new Error(`Model did not return valid JSON: ${parseError.message}`);
  }
}

/**
 * Validate the AI update response's *shape*. Does not know about any
 * particular template — see filterUpdatesToTemplate for scoping updates to
 * only the keys/variables/ids that actually exist on the template being
 * edited.
 */
function validateUpdates(updates) {
  const errors = [];

  if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
    throw new Error('Model response is not a JSON object');
  }

  if (updates.textUpdates) {
    if (typeof updates.textUpdates !== 'object') {
      errors.push('textUpdates must be an object');
    } else {
      for (const [key, value] of Object.entries(updates.textUpdates)) {
        if (typeof value !== 'string') {
          errors.push(`textUpdates["${key}"] must be a string`);
        }
      }
    }
  }

  if (updates.colorUpdates) {
    if (typeof updates.colorUpdates !== 'object') {
      errors.push('colorUpdates must be an object');
    } else {
      for (const [key, value] of Object.entries(updates.colorUpdates)) {
        if (!key.startsWith('--')) {
          errors.push(`colorUpdates key "${key}" must start with --`);
        }
        if (typeof value !== 'string' || !SAFE_HEX_COLOR.test(value)) {
          errors.push(`colorUpdates["${key}"] must be a valid hex color, got: ${value}`);
        }
      }
    }
  }

  if (updates.animationUpdates) {
    if (typeof updates.animationUpdates !== 'object') {
      errors.push('animationUpdates must be an object');
    } else {
      for (const [key, anim] of Object.entries(updates.animationUpdates)) {
        if (!anim || typeof anim !== 'object') {
          errors.push(`animationUpdates["${key}"] must be an object`);
          continue;
        }
        if (anim.animation && !SAFE_ANIMATION_NAME.test(anim.animation)) {
          errors.push(`animationUpdates["${key}"].animation is not a valid name`);
        }
        if (anim.duration && !SAFE_DURATION.test(anim.duration)) {
          errors.push(`animationUpdates["${key}"].duration must be like "1s" or "300ms"`);
        }
      }
    }
  }

  if (errors.length) {
    const err = new Error('AI updates failed validation');
    err.details = errors;
    throw err;
  }

  return updates;
}

/**
 * Pull the set of editable field keys / CSS variables / element ids out of
 * a base template, so we can (a) tell the model exactly what it's allowed
 * to touch and (b) drop anything it returns that isn't in that set.
 */
function extractEditableContext(template, currentContent) {
  const html = template?.html || '';
  const css = template?.css || '';

  const fieldKeys = (template?.fields || []).map((f) => ({
    key: f.key,
    label: f.label,
    current: currentContent && currentContent[f.key] !== undefined
      ? currentContent[f.key]
      : template?.defaults?.[f.key],
  }));

  const cssVariables = [];
  const rootMatch = css.match(/:root\s*\{([^}]*)\}/);
  if (rootMatch) {
    const varPattern = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = varPattern.exec(rootMatch[1]))) {
      cssVariables.push({ name: m[1], value: m[2].trim() });
    }
  }

  const elementIds = [];
  const idPattern = /\bid=["']([a-zA-Z0-9_-]+)["']/g;
  let idm;
  while ((idm = idPattern.exec(html))) {
    if (!elementIds.includes(idm[1])) elementIds.push(idm[1]);
  }

  return { fieldKeys, cssVariables, elementIds };
}

/**
 * Drop any keys the model returned that don't correspond to something that
 * actually exists on this template. This is the hard backstop that keeps
 * "editable area only" true even if the model ignores the instructions.
 */
function filterUpdatesToTemplate(updates, editableContext) {
  const validFieldKeys = new Set(editableContext.fieldKeys.map((f) => f.key));
  const validCssVars = new Set(editableContext.cssVariables.map((v) => v.name));
  const validElementIds = new Set(editableContext.elementIds);

  const dropped = { textUpdates: [], colorUpdates: [], animationUpdates: [] };
  const filtered = {};

  if (updates.textUpdates) {
    filtered.textUpdates = {};
    for (const [key, value] of Object.entries(updates.textUpdates)) {
      if (validFieldKeys.has(key)) filtered.textUpdates[key] = value;
      else dropped.textUpdates.push(key);
    }
    if (Object.keys(filtered.textUpdates).length === 0) delete filtered.textUpdates;
  }

  if (updates.colorUpdates) {
    filtered.colorUpdates = {};
    for (const [key, value] of Object.entries(updates.colorUpdates)) {
      if (validCssVars.has(key)) filtered.colorUpdates[key] = value;
      else dropped.colorUpdates.push(key);
    }
    if (Object.keys(filtered.colorUpdates).length === 0) delete filtered.colorUpdates;
  }

  if (updates.animationUpdates) {
    filtered.animationUpdates = {};
    for (const [key, value] of Object.entries(updates.animationUpdates)) {
      if (validElementIds.has(key)) filtered.animationUpdates[key] = value;
      else dropped.animationUpdates.push(key);
    }
    if (Object.keys(filtered.animationUpdates).length === 0) delete filtered.animationUpdates;
  }

  return { filtered, dropped };
}

/**
 * Generate AI updates for a section (non-streaming).
 * `template` is the base design currently selected for this section — the
 * model is only ever shown (and restricted to) its existing field keys,
 * CSS variables, and element ids.
 */
async function generateSectionUpdates({ sectionType, prompt, currentContent, template }) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error('NVIDIA_API_KEY environment variable is not set');
  if (!prompt || !prompt.trim()) throw new Error('A prompt is required');
  if (!template) throw new Error('A base template must be selected before requesting AI edits');

  const editableContext = extractEditableContext(template, currentContent);
  const systemPrompt = buildSystemPrompt(editableContext);

  const userPrompt = `Section type: ${sectionType}\n\nUser request: ${prompt.trim()}\n\nReturn ONLY the JSON update object as described in the system prompt.`;

  const raw = await callNvidia(apiKey, systemPrompt, userPrompt);
  const updates = validateUpdates(extractJSON(raw));
  const { filtered, dropped } = filterUpdatesToTemplate(updates, editableContext);
  return { updates: filtered, dropped };
}

/**
 * Streaming variant. Streams raw model text via onChunk as it arrives, then
 * resolves with the same { updates, dropped } shape as generateSectionUpdates
 * once the full response has been received, parsed, and validated.
 */
async function generateSectionUpdatesStream({ sectionType, prompt, currentContent, template, onChunk }) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error('NVIDIA_API_KEY environment variable is not set');
  if (!prompt || !prompt.trim()) throw new Error('A prompt is required');
  if (!template) throw new Error('A base template must be selected before requesting AI edits');

  const editableContext = extractEditableContext(template, currentContent);
  const systemPrompt = buildSystemPrompt(editableContext);

  const userPrompt = `Section type: ${sectionType}\n\nUser request: ${prompt.trim()}\n\nReturn ONLY the JSON update object as described in the system prompt.`;

  const raw = await callNvidiaStream(apiKey, systemPrompt, userPrompt, onChunk);
  const updates = validateUpdates(extractJSON(raw));
  const { filtered, dropped } = filterUpdatesToTemplate(updates, editableContext);
  return { updates: filtered, dropped };
}

/**
 * Apply updates to a template, returning a new { html, css, js } object.
 * The base template is never mutated — text is substituted into a copy of
 * the html, color variables are patched inside the existing :root block,
 * and animations are appended as small, targeted CSS rules. Nothing outside
 * of those three scoped mechanisms is ever touched, and "js" always passes
 * through unchanged (the AI never generates behavior/logic).
 */
function applyUpdatesToTemplate(template, updates) {
  // template.css only contains rules like `.cover-section { background: var(--bg-page); }`
  // - the actual variable values live separately in template.colors and were
  // never baked into the CSS as a :root block. Do that here so (a) the
  // colorUpdates patching below has a real :root to find/patch, and (b) the
  // resulting css is self-contained (works standalone, e.g. once saved as an
  // AI design, without the caller having to inject template.colors itself).
  const hasRootBlock = /:root\s*\{[^}]*\}/.test(template.css || '');
  const rootBlock = template.colors && Object.keys(template.colors).length
    ? `:root {\n${Object.entries(template.colors).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}\n\n`
    : '';
  const baseCss = hasRootBlock ? (template.css || '') : `${rootBlock}${template.css || ''}`;

  const result = {
    html: template.html,
    css: baseCss,
    js: template.js || '',
  };

  // Apply text updates by replacing {{fieldKey}} placeholders (and, for
  // templates that render ids directly, matching id="..." elements too).
  if (updates.textUpdates) {
    for (const [elementId, newText] of Object.entries(updates.textUpdates)) {
      const escapedId = elementId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const placeholderPattern = new RegExp(`{{\\s*${escapedId}\\s*}}`, 'g');
      if (placeholderPattern.test(result.html)) {
        result.html = result.html.replace(placeholderPattern, newText);
      }

      const idPattern = new RegExp(`(id=["']${escapedId}["'][^>]*>)([^<]*)(<)`, 'gi');
      if (idPattern.test(result.html)) {
        result.html = result.html.replace(idPattern, `$1${newText}$3`);
      }
    }
  }

  // Apply color updates by patching existing CSS variables inside :root —
  // never adding new selectors or rewriting any other part of the stylesheet.
  if (updates.colorUpdates && Object.keys(updates.colorUpdates).length) {
    const rootMatch = result.css.match(/:root\s*\{([^}]*)\}/);
    if (rootMatch) {
      let rootVars = rootMatch[1];
      for (const [varName, color] of Object.entries(updates.colorUpdates)) {
        const escapedVar = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const varPattern = new RegExp(`${escapedVar}\\s*:\\s*[^;]+;`, 'g');
        if (varPattern.test(rootVars)) {
          rootVars = rootVars.replace(varPattern, `${varName}: ${color};`);
        }
        // Note: we deliberately do NOT add variables that don't already
        // exist — filterUpdatesToTemplate should have already dropped
        // those; this is just a second guard against an unknown variable
        // sneaking a brand-new global rule into the stylesheet.
      }
      result.css = result.css.replace(/:root\s*\{[^}]*\}/, `:root {${rootVars}}`);
    }
  }

  // Apply animation updates as small, targeted CSS rules scoped to existing
  // element ids only.
  if (updates.animationUpdates && Object.keys(updates.animationUpdates).length) {
    const animationStyles = [];
    for (const [elementId, anim] of Object.entries(updates.animationUpdates)) {
      const escapedId = elementId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const animProps = [];
      if (anim.animation) animProps.push(`animation-name: ${anim.animation}`);
      if (anim.duration) animProps.push(`animation-duration: ${anim.duration}`);
      if (anim.timing) animProps.push(`animation-timing-function: ${anim.timing}`);

      if (animProps.length > 0) {
        animationStyles.push(`#${escapedId} {\n  ${animProps.join(';\n  ')};\n}`);
      }
    }

    if (animationStyles.length > 0) {
      result.css += `\n\n/* AI-generated animations */\n${animationStyles.join('\n\n')}`;
    }
  }

  return result;
}

module.exports = {
  generateSectionUpdates,
  generateSectionUpdatesStream,
  applyUpdatesToTemplate,
  extractEditableContext,
  DEFAULT_MODEL,
};
