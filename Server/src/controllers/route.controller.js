const { fetchPolyline } = require("../services/osrm.service");

exports.getPolyLineByORM = async (req, res) => {
  try {
    const { coords } = req.body;
    const result = await fetchPolyline(coords);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("OSRM API error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
