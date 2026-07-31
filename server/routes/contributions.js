import { Router } from 'express'

const router = Router()

// Simple in-memory cache — GitHub GraphQL has a 5000 req/hr limit.
// Cache for 1 hour so repeated page loads don't burn the quota.
let cache = null
let cacheTime = 0
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in ms

router.get('/', async (req, res) => {
  try {
    // Serve from cache if fresh
    if (cache && Date.now() - cacheTime < CACHE_TTL) {
      return res.json(cache)
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured' })
    }

    // GitHub GraphQL — contributionCalendar gives us the full year grid
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  weekday
                }
              }
            }
          }
        }
      }
    `

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username: 'Ritam369' } }),
    })

    if (!response.ok) {
      return res.status(502).json({ error: `GitHub API error: ${response.status}` })
    }

    const json = await response.json()

    if (json.errors) {
      return res.status(502).json({ error: json.errors[0]?.message || 'GitHub GraphQL error' })
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) {
      return res.status(502).json({ error: 'Unexpected GitHub API response shape' })
    }

    const payload = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    }

    // Store in cache
    cache = payload
    cacheTime = Date.now()

    return res.json(payload)
  } catch (err) {
    console.error('[contributions]', err)
    return res.status(500).json({ error: 'Failed to fetch contributions' })
  }
})

export default router
