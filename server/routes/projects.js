import { Router } from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const projects = require('../data/projects.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    const featured = projects
      .filter((p) => p.featured === true)
      .sort((a, b) => a.order - b.order)
    res.json(featured)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load projects data' })
  }
})

export default router
