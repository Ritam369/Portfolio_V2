import 'dotenv/config'
import express from 'express'
import contributionsRouter from './routes/contributions.js'

const app = express()

// GitHub contributions proxy — the only remaining API route.
// All static portfolio content is bundled into the client (client/src/lib/content.js).
app.use('/api/github-contributions', contributionsRouter)

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' })
})

// 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

export default app
