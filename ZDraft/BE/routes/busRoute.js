const express = require('express');
const router = express.Router();
const busService = require('../services/bus/busService');

// API: GET /api/busroute?from=lng,lat&to=lng,lat
router.get('/', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ message: 'Missing from or to' });

  const fromArr = from.split(',').map(Number);
  const toArr = to.split(',').map(Number);

  try {
    const geometry = await busService.getBusRoute(fromArr, toArr);
    if (!geometry) return res.status(404).json({ message: 'Route not found' });
    res.json(geometry); // Trả về GeoJSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
