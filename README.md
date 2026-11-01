# ritamsaha.me — Portfolio V2

Personal portfolio for Ritam Saha. Dark, terminal-inspired aesthetic built with React + Vite, deployed on Vercel at [ritamsaha.me](https://ritamsaha.me). All portfolio content is bundled into the client — no API round-trip on page load. A minimal Express serverless function remains, used only as an authenticated proxy for the GitHub contributions graph.

## Tech Stack

- **Frontend:** React 18 (Vite), React Router v6, Tailwind CSS v3
- **Data:** Hardcoded JSON files in `client/src/data/`, imported synchronously via `client/src/lib/content.js` — no database, no fetch for content
- **Backend:** Node.js + Express as a Vercel serverless function — ONLY `/api/github-contributions` (GitHub GraphQL proxy keeping `GITHUB_TOKEN` server-side)
- **Font:** JetBrains Mono (Google Fonts)
- **Package manager:** bun (local dev) / npm (Vercel build)

## Project Structure

```
portfolio-v2/
├── client/
│   ├── public/              # Static assets (avatar image, etc.)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx       # Fixed top-right nav, hamburger mobile menu
│       │   ├── Footer.jsx
│       │   ├── ProjectCard.jsx  # flex-col card with links pinned bottom-left
│       │   ├── BlogCard.jsx     # date + title list row
│       │   ├── ExperienceItem.jsx
│       │   └── LinkItem.jsx     # icon + label + value + external arrow
│       ├── pages/
│       │   ├── Home.jsx         # Hero with typing effect, featured blogs & projects
│       │   ├── Experience.jsx
│       │   ├── Blogs.jsx        # All blogs + live dev.to article count
│       │   ├── Projects.jsx     # All projects with Show More pagination
│       │   └── Links.jsx        # Grouped sections with avatar header
│       ├── data/
│       │   ├── experience.json
│       │   ├── projects.json
│       │   ├── blogs.json
│       │   ├── links.json
│       │   └── npm-packages.json
│       ├── lib/
│       │   ├── content.js       # Synchronous getters for the JSON above (sorting/featured logic)
│       │   └── api.js           # Live fetches only: getContributions(), getDevToCount()
│       ├── App.jsx              # Router, ScrollToTop, 404 page
│       └── index.css            # Tailwind directives, design tokens, animations
├── server/
│   ├── routes/
│   │   └── contributions.js     # GitHub GraphQL proxy (GITHUB_TOKEN, 1h cache)
│   ├── app.js                   # Express app — no .listen() here
│   └── index.js                 # Local dev entry: imports app, calls .listen()
├── api/
│   └── index.js                 # Vercel serverless entry — re-exports server/app.js
├── vercel.json
├── package.json             # Root — express + dotenv deps for Vercel, type: module
└── README.md
```

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, featured blogs, featured projects |
| `/experience` | Work experience list |
| `/blogs` | All blogs + live dev.to total count |
| `/projects` | All projects with pagination |
| `/links` | Grouped contact & social links |

## API Endpoint

Only one endpoint remains — everything else is bundled into the client by `client/src/lib/content.js`:

```
GET /api/github-contributions → last-year contribution calendar (GitHub GraphQL proxy, 1h server cache)
```

## Content Rules

Content is edited directly in `client/src/data/*.json` (`experience.json`, `projects.json`, `blogs.json`, `links.json`, `npm-packages.json`). Because the JSON is bundled into the JS build, **every content change requires a commit + redeploy** to go live.

| `featured` value | Home page | `/blogs` or `/projects` page |
|---|---|---|
| `true` | ✅ shown | ✅ shown |
| `false` | ❌ hidden | ✅ shown |

The **"Show N more →"** indicator on the Home page = total entries − featured entries, linking to the full page. (`npm-packages.json` has no `featured` flag — the Home section shows all packages with a show more/less toggle.)

The **"N articles published"** count on `/blogs` is fetched live from the dev.to public API (`dev.to/api/articles?username=ritam369`) and falls back to the local JSON count if the request fails. The page renders instantly with the local count — the live number only replaces it when it arrives.

## Local Development

```bash
# Install deps
bun install                  # root (express, dotenv, concurrently)
cd client && bun install     # frontend

# Run both servers concurrently from the root
bun run dev
```

- Vite dev server: http://localhost:5173
- Express API: http://localhost:5000 (only serves `/api/github-contributions`)
- Vite proxies `/api/*` → `localhost:5000` automatically
- All pages except the contributions graph work with `bun run dev:client` alone (no server needed); the graph requires the local server plus a `GITHUB_TOKEN` in `.env`

## Design System

| Token | Value | Use |
|---|---|---|
| `bg-primary` | `#0a0a0a` | Page background |
| `bg-surface` | `#111111` | Cards, panels |
| `border-subtle` | `#262626` | Hairline borders |
| `text-primary` | `#e5e5e5` | Headings, body |
| `text-muted` | `#8a8a8a` | Dates, secondary text |
| `accent` | `#7dd3dc` | Links, active nav, highlights |
| `accent-hover` | `#a3e4ea` | Hover state |

Font: `JetBrains Mono` — used for everything, no serif/sans mixing.
