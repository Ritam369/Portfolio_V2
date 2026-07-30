# ritamsaha.me — Portfolio V2

Personal portfolio for Ritam Saha. Dark, terminal-inspired aesthetic built with React + Vite on the frontend and Express on the backend, deployed on Vercel at [ritamsaha.me](https://ritamsaha.me).

## Tech Stack

- **Frontend:** React 18 (Vite), React Router v6, Tailwind CSS v3
- **Backend:** Node.js + Express, served as a Vercel serverless function
- **Data:** Hardcoded JSON files in `server/data/` — no database
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
│       ├── lib/
│       │   └── api.js           # Fetch wrappers for all /api/* endpoints
│       ├── App.jsx              # Router, ScrollToTop, 404 page
│       └── index.css            # Tailwind directives, design tokens, animations
├── server/
│   ├── data/
│   │   ├── experience.json
│   │   ├── projects.json
│   │   ├── blogs.json
│   │   └── links.json
│   ├── routes/
│   │   ├── experience.js
│   │   ├── projects.js      # supports ?all=true query param
│   │   ├── blogs.js         # supports ?all=true query param
│   │   └── links.js
│   ├── app.js               # Express app — no .listen() here
│   └── index.js             # Local dev entry: imports app, calls .listen()
├── api/
│   └── index.js             # Vercel serverless entry — re-exports server/app.js
├── vercel.json
├── package.json             # Root — express + cors deps for Vercel, type: module
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

## API Endpoints

```
GET /api/experience          → all entries, sorted by startDate desc
GET /api/projects            → featured only, sorted by order
GET /api/projects?all=true   → all projects, sorted by order
GET /api/blogs               → featured only, sorted by publishedDate desc
GET /api/blogs?all=true      → all blogs, sorted by publishedDate desc
GET /api/links               → grouped object { connect, professional, content }
```

## Content Rules

| `featured` value | Home page | `/blogs` or `/projects` page |
|---|---|---|
| `true` | ✅ shown | ✅ shown |
| `false` | ❌ hidden | ✅ shown |

The **"Show N more →"** indicator on the Home page = total entries − featured entries, linking to the full page.

The **"N articles published"** count on `/blogs` is fetched live from the dev.to public API (`dev.to/api/articles?username=ritam369`) and falls back to the local JSON count if the request fails.

## Local Development

```bash
# Install deps
bun install                  # root (express, cors, concurrently)
cd client && bun install     # frontend

# Run both servers concurrently from the root
bun run dev
```

- Vite dev server: http://localhost:5173
- Express API: http://localhost:5000
- Vite proxies `/api/*` → `localhost:5000` automatically

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
