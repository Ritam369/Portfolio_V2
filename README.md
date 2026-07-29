# ritamsaha.me — Portfolio V2

Personal portfolio for Ritam Saha. Dark, terminal-inspired aesthetic built with React + Vite on the frontend and Express on the backend, deployed on Vercel.

## Tech Stack

- **Frontend:** React (Vite), React Router v6, Tailwind CSS
- **Backend:** Node.js + Express (Vercel serverless function)
- **Data:** Hardcoded JSON files in `server/data/`
- **Font:** JetBrains Mono
- **Package manager:** bun

## Project Structure

```
portfolio-v2/
├── client/          # React app (Vite)
├── server/          # Express app + data JSON
│   ├── data/        # experience.json, projects.json, blogs.json, links.json
│   └── routes/      # one router file per resource
├── api/
│   └── index.js     # Vercel serverless entry
├── vercel.json
└── package.json
```

## Local Development

```bash
# Install all deps
cd client && bun install
cd .. && bun install

# Run both servers concurrently
bun run dev
```

- Vite dev server: http://localhost:5173
- Express API: http://localhost:5000

## Adding Content

All content lives in `server/data/*.json`. To add a new project, append an object to `projects.json` — no code changes needed. Set `featured: false` to hide it from the site without deleting it.

## Deployment

Push to GitHub and connect to Vercel. The `vercel.json` routes `/api/*` to the Express serverless function and everything else to the React build.
