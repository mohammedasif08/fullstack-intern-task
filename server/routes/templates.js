const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

// GET /api/templates — list all templates
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query
    let query = 'SELECT * FROM templates'
    const params = []
    const conditions = []

    if (category) {
      params.push(category)
      conditions.push(`category = $${params.length}`)
    }

    if (search) {
      params.push(`%${search}%`)
      conditions.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`)
    }

    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY id ASC'

    const result = await pool.query(query, params)
    res.json({ templates: result.rows, total: result.rowCount })
  } catch (err) {
    console.error('Templates list error:', err)
    res.status(500).json({ message: 'Failed to fetch templates.' })
  }
})

// GET /api/templates/:id — get template by id
router.get('/:id', async (req, res) => {
  const { id } = req.params

  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid template ID.' })
  }

  try {
    const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found.' })
    }

    res.json({ template: result.rows[0] })
  } catch (err) {
    console.error('Template detail error:', err)
    res.status(500).json({ message: 'Failed to fetch template.' })
  }
})

module.exports = router
