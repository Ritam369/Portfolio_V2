import app from './app.js'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`[server] API running at http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[server] Port ${PORT} is already in use. Kill the existing process and retry.`)
    console.error(`         Run: fuser -k ${PORT}/tcp`)
    process.exit(1)
  } else {
    throw err
  }
})
