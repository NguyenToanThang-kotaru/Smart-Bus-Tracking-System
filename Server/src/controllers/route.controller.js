require('dotenv').config();
const axios = require("axios");

exports.getPolyLineByORM = async (req, res) => {
  try {
    const { coords } = req.body;

    if (!coords || !Array.isArray(coords) || coords.length < 2) {
      return res.status(400).json({
        error: "Thiếu dữ liệu hoặc không đủ 2 tọa độ [lon, lat]",
      });
    }

    const coordString = coords.map(c => c.join(",")).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;
    console.log("Fetching:", url);

    // gọi OSRM có timeout 10 giây
    const response = await axios.get(url, { timeout: 10000 });
    const data = response.data;

    if (!data.routes || data.routes.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy route phù hợp" });
    }

    const route = data.routes[0];
    res.json({
      success: true,
      distance: route.distance,
      duration: route.duration,
      polyline: route.geometry.coordinates,
    });

  } catch (error) {
    console.error("OSRM API error:", error.message);

    // Kiểm tra nếu lỗi do timeout
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: "OSRM phản hồi quá lâu (timeout)" });
    }

    res.status(500).json({
      error: "Lỗi khi gọi OSRM API",
      details: error.message,
    });
  }
};
