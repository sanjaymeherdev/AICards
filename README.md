# Wedding Card App

A full-featured wedding invitation website builder with AI-powered customization. This repo merges two previously separate projects into one deployable app:

- **`public/wedding-cards/`** — the WeddingCards site: a landing page and 9
  finished, ready-to-use wedding invitation templates (formerly
  `sanjayaidev/WeddingCards`).
- **`public/ai-card-design/`** — the AICardDesign tool: a step-by-step builder
  that assembles a card from modular section designs (cover, hero, RSVP,
  gallery, etc.), served at `/ai-design/` (formerly
  `sanjayaidev/AICardDesign`).

Both are now served by a single Express server (`server.js`) instead of two
separate Vercel deployments, which is what lets this run as one Railway
service.

## Features

- **9 Pre-built Templates**: blush-romance, emerald-classic, ivory-minimal,
  love-romantic, purple-velvet, royal-gold, silver-elegance, sky-blue, sunset-glow
- **AI-Powered Customization**: Use NVIDIA's API to intelligently update text,
  colors, and animations while respecting template structure
- **Modular Section Builder**: Mix and match sections from 11 categories:
  cover, hero, events, gallery, rsvp, lovestory, venue, countdown, dresscode,
  music, scratch
- **Persistent Storage**: PostgreSQL-backed storage for cards and AI-generated
  designs via Railway
- **Image Upload Support**: Upload custom images via multer

## Routes

| Route | What it serves |
|---|---|
| `/` | WeddingCards landing page + template gallery |
| `/templates/<name>/...` | Individual wedding card templates (static) |
| `/ai-design/` | AICardDesign step-builder tool |
| `/api/sections/:type` | List of designs available for a section (e.g. `cover`, `hero`) |
| `/api/sections/:type/:id` | Full config for one design |
| `/api/card?slug=...` | Look up a saved card by slug |
| `POST /api/card` | Save/update a card (`{ slug, template_id, status, data }`) |
| `POST /api/ai/generate` | Generate AI-powered content updates |
| `POST /api/ai/save-section` | Save AI-generated section designs to database |

The `/api/card` storage uses PostgreSQL when `DATABASE_URL` is provided.
Without it, falls back to a plain JSON file (`data/cards.json`) which is
**not** persistent across redeploys on Railway (the filesystem resets on each
deploy).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string (Railway auto-provides) | - |
| `NVIDIA_API_KEY` | API key for NVIDIA AI model | - |
| `AI_DESIGN_MODEL` | NVIDIA model to use for AI generation | `mistralai/mistral-small-4-119b-2603` |

## Run locally

```bash
npm install
npm start
```

Visit `http://localhost:3000/` and `http://localhost:3000/ai-design/`.

### With Database (optional)

```bash
# Set up local Postgres or use Railway's DATABASE_URL
export DATABASE_URL="postgresql://..."
node scripts/migrate.js  # Run schema migrations
npm start
```

### With AI Features (optional)

```bash
export NVIDIA_API_KEY="your-nvidia-api-key"
npm start
```

## Deploy to Railway

1. Push this repo to a new GitHub repository (see below).
2. In Railway: **New Project → Deploy from GitHub repo** → select the repo.
3. Add environment variables in Railway dashboard:
   - `NVIDIA_API_KEY` (for AI features)
   - `DATABASE_URL` (add PostgreSQL plugin for persistent storage)
4. Railway auto-detects Node.js (via `package.json`) and runs `npm install`
   then `npm start`. No extra configuration is required — `server.js` already
   reads `process.env.PORT`, which Railway sets automatically.
5. Once deployed, Railway gives you a public URL (or attach a custom domain
   under the service's **Settings → Domains**).

### Run Migrations

After connecting PostgreSQL, run migrations once:

```bash
railway run node scripts/migrate.js
```

Or in Railway dashboard: **Variables → New Variable → Run Command**

### Pushing this to GitHub

```bash
git init
git add .
git commit -m "Merge WeddingCards + AICardDesign into one Railway app"
git branch -M main
git remote add origin https://github.com/<your-username>/<new-repo-name>.git
git push -u origin main
```

## Scripts

| Script | Description |
|---|---|
| `node scripts/migrate.js` | Run database migrations |
| `node scripts/generate-templates.js` | Generate template configurations |
| `node scripts/generate-all-templates.js` | Generate all template configurations |
| `node scripts/create-all-templates.js` | Create all template files |
| `node scripts/build-all-templates.js` | Build all templates for production |
| `node scripts/generate-section-templates.js` | Generate section templates |
| `node scripts/generate-all-section-templates.js` | Generate all section templates |

## Project Structure

```
├── server.js                 # Main Express server
├── package.json              # Dependencies and scripts
├── railway.json              # Railway deployment config
├── db/
│   └── schema.sql            # PostgreSQL schema
├── data/
│   └── cards.json            # Fallback card storage (ephemeral)
├── lib/
│   ├── ai.js                 # AI generation logic
│   └── db.js                 # Database connection pool
├── images/                   # Template background images
├── scripts/                  # Template generation utilities
└── public/
    ├── wedding-cards/        # Main wedding card site
    │   ├── index.html
    │   ├── builder.css
    │   └── templates/        # 9 pre-built templates
    └── ai-card-design/       # AI card designer tool
        ├── index.html
        └── sections/         # Modular section designs
```

## Notes on the merge

- The old `vercel.json`, `.oxlintrc.json`, and the unused React
  `package-lock.json` from WeddingCards were dropped — the site itself is
  plain HTML/CSS/JS, so none of that was actually load-bearing.
- AICardDesign's original `server.js` (plain Node `http`, no dependencies)
  was rewritten as Express routes so both apps' static files and APIs can be
  served from one process on one port, which is what Railway expects.
- AI features use NVIDIA's API with strict validation to ensure only safe,
  scoped modifications to existing templates (no arbitrary HTML/CSS injection).
- Database tables store AI-generated designs so they persist across deploys
  and appear alongside file-based designs in the section picker.
