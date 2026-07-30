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

/**
 * @param {boolean} all - if true, fetches all blogs (featured + non-featured).
 *                        if false/omitted, fetches only featured blogs.
 */
export function getBlogs(all = false) {
  return fetchJSON(all ? '/blogs?all=true' : '/blogs')
}

export function getLinks() {
  return fetchJSON('/links')
}

/**
 * Fetches total published article count from dev.to public API.
 * Uses page-size trick: request page=1 with per_page=1 and read the
 * x-total header, falling back to counting pages if needed.
 * Returns a number, or null if the request fails.
 */
export async function getDevToCount(username = 'ritam369') {
  try {
    // dev.to doesn't expose a dedicated count endpoint, but fetching
    // page=1&per_page=1000 gives us up to 1000 articles; for most users
    // this is the full list. We just take .length as the count.
    // If you ever exceed 1000 posts, paginate here.
    const res = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=1000`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) return null
    const articles = await res.json()
    return Array.isArray(articles) ? articles.length : null
  } catch {
    return null
  }
}
