// API fetch wrappers for all /api/* endpoints.
// In dev, Vite proxies /api to localhost:5000.
// In production, Vercel routes /api to the serverless function.

const BASE = '/api'

async function fetchJSON(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`)
  }
  return res.json()
}

export function getExperience() {
  return fetchJSON('/experience')
}

export function getProjects() {
  return fetchJSON('/projects')
}

export function getBlogs() {
  return fetchJSON('/blogs')
}

export function getLinks() {
  return fetchJSON('/links')
}
