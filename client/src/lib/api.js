// API fetch wrappers for the remaining live endpoints.
// Static portfolio content now lives in lib/content.js (bundled).
// In dev, Vite proxies /api to localhost:5000.
// In production, Vercel routes /api to the serverless function.

const BASE = '/api'

export async function getContributions() {
  const res = await fetch(`${BASE}/github-contributions`)
  if (!res.ok) {
    throw new Error(`API error ${res.status} for /github-contributions`)
  }
  return res.json()
}

/**
 * Fetches total published article count from dev.to public API.
 * Returns a number, or null if the request fails or is aborted.
 * @param {AbortSignal} [signal] - optional signal to cancel the request
 *                                 (e.g. on unmount).
 */
export async function getDevToCount(username = 'ritam369', signal) {
  try {
    // dev.to doesn't expose a dedicated count endpoint, but fetching
    // page=1&per_page=1000 gives us up to 1000 articles; for most users
    // this is the full list. We just take .length as the count.
    // If you ever exceed 1000 posts, paginate here.
    const res = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=1000`,
      { headers: { Accept: 'application/json' }, signal }
    )
    if (!res.ok) return null
    const articles = await res.json()
    return Array.isArray(articles) ? articles.length : null
  } catch {
    return null
  }
}
