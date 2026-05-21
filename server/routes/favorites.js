const express = require('express')
const router = express.Router()
const pool = require('../db/pool')
const authMiddleware = require('../middleware/auth')

// All favorites routes require authentication
router.use(authMiddleware)

// GET /api/favorites — get user's favorited templates
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.* FROM templates t
       INNER JOIN favorites f ON f.template_id = t.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.userId]
    )

    res.json({ favorites: result.rows, total: result.rowCount })
  } catch (err) {
    console.error('Favorites get error:', err)
    res.status(500).json({ message: 'Failed to fetch favorites.' })
  }
})

// POST /api/favorites/:templateId — add to favorites
router.post('/:templateId', async (req, res) => {
  const templateId = parseInt(req.params.templateId)

  if (isNaN(templateId)) {
    return res.status(400).json({ message: 'Invalid template ID.' })
  }

  try {
    // Check template exists
    const tmpl = await pool.query('SELECT id FROM templates WHERE id = $1', [templateId])
    if (tmpl.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found.' })
    }

    // Upsert favorite (ignore if already exists)
    await pool.query(
      'INSERT INTO favorites (user_id, template_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.userId, templateId]
    )

    res.status(201).json({ message: 'Added to favorites.', templateId })
  } catch (err) {
    console.error('Favorite add error:', err)
    res.status(500).json({ message: 'Failed to add favorite.' })
  }
})

// DELETE /api/favorites/:templateId — remove from favorites
router.delete('/:templateId', async (req, res) => {
  const templateId = parseInt(req.params.templateId)

  if (isNaN(templateId)) {
    return res.status(400).json({ message: 'Invalid template ID.' })
  }

  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND template_id = $2',
      [req.user.userId, templateId]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Favorite not found.' })
    }

    res.json({ message: 'Removed from favorites.', templateId })
  } catch (err) {
    console.error('Favorite remove error:', err)
    res.status(500).json({ message: 'Failed to remove favorite.' })
  }
})

module.exports = router
