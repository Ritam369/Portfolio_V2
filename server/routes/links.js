import { Router } from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const links = require('../data/links.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    res.json(links)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load links data' })
  }
})

export default router
