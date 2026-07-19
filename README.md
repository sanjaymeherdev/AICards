# Wedding Card App

This repo merges two previously separate projects into one deployable app:

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

The `/api/card` storage is a plain JSON file (`data/cards.json`) — enough to
make the existing landing-page fetch call work end-to-end, but **not**
persistent across redeploys on Railway (the filesystem resets on each
deploy). For real persistence, add Railway's Postgres plugin and swap
`readCardsDB`/`writeCardsDB` in `server.js` for real queries.

## Run locally

```bash
npm install
npm start
```

Visit `http://localhost:3000/` and `http://localhost:3000/ai-design/`.

## Deploy to Railway

1. Push this repo to a new GitHub repository (see below).
2. In Railway: **New Project → Deploy from GitHub repo** → select the repo.
3. Railway auto-detects Node.js (via `package.json`) and runs `npm install`
   then `npm start`. No extra configuration is required — `server.js` already
   reads `process.env.PORT`, which Railway sets automatically.
4. Once deployed, Railway gives you a public URL (or attach a custom domain
   under the service's **Settings → Domains**).

### Pushing this to GitHub

```bash
git init
git add .
git commit -m "Merge WeddingCards + AICardDesign into one Railway app"
git branch -M main
git remote add origin https://github.com/<your-username>/<new-repo-name>.git
git push -u origin main
```

## Notes on the merge

- The old `vercel.json`, `.oxlintrc.json`, and the unused React
  `package-lock.json` from WeddingCards were dropped — the site itself is
  plain HTML/CSS/JS, so none of that was actually load-bearing.
- AICardDesign's original `server.js` (plain Node `http`, no dependencies)
  was rewritten as Express routes so both apps' static files and APIs can be
  served from one process on one port, which is what Railway expects.
