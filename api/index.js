// Vercel serverless function entry point.
// Imports the same Express app used for local dev — no duplicated route logic.
import app from '../server/app.js'

export default app
