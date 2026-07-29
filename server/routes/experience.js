import { Router } from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const experience = require('../data/experience.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    const sorted = [...experience].sort((a, b) => {
      // current jobs first, then by startDate descending
      if (a.current && !b.current) return -1
      if (!a.current && b.current) return 1
      return b.startDate.localeCompare(a.startDate)
    })
    res.json(sorted)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load experience data' })
  }
})

export default router
