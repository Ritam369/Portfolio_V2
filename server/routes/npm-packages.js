import { Router } from 'express'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packages = require('../data/npm-packages.json')

const router = Router()

router.get('/', (req, res) => {
  try {
    res.json(packages)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load npm packages data' })
  }
})

export default router
