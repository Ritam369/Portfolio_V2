import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import experienceRouter from './routes/experience.js'
import projectsRouter from './routes/projects.js'
import blogsRouter from './routes/blogs.js'
import linksRouter from './routes/links.js'
import contributionsRouter from './routes/contributions.js'
import npmPackagesRouter from './routes/npm-packages.js'

const app = express()

app.use(cors())
app.use(express.json())

// API routes
app.use('/api/experience', experienceRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/links', linksRouter)
app.use('/api/github-contributions', contributionsRouter)
app.use('/api/npm-packages', npmPackagesRouter)

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' })
})

// 404 handler for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' })
})

export default app
