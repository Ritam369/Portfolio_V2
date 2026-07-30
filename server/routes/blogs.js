import { Router } from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const blogs = require('../data/blogs.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    const all = req.query.all === 'true'

    const result = (all ? blogs : blogs.filter((b) => b.featured === true))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load blogs data' })
  }
})

export default router
