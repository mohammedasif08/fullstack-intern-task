require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const initDB = require('./db/init')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || '*' 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logger in dev
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'))
app.use('/api/templates', require('./routes/templates'))
app.use('/api/favorites', require('./routes/favorites'))

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ message: 'Internal server error.', error: process.env.NODE_ENV === 'development' ? err.message : undefined })
})

// ── Boot ─────────────────────────────────────────────────────────────────────
const start = async () => {
  try {
    await initDB()
    app.listen(PORT, () => {
      console.log(`\n🚀 TemplateVault API running on http://localhost:${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`\nEndpoints:`)
      console.log(`  POST /api/auth/register`)
      console.log(`  POST /api/auth/login`)
      console.log(`  GET  /api/auth/me`)
      console.log(`  GET  /api/templates`)
      console.log(`  GET  /api/templates/:id`)
      console.log(`  GET  /api/favorites`)
      console.log(`  POST /api/favorites/:templateId`)
      console.log(`  DELETE /api/favorites/:templateId\n`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

start()
