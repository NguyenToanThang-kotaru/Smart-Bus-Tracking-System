const axios = require("axios");

exports.fetchPolyline = async (coords) => {
  if (!coords || !Array.isArray(coords) || coords.length < 2) {
    throw new Error("Thiếu dữ liệu hoặc không đủ 2 tọa độ [lon, lat]");
  }

  const coordString = coords.map(c => c.join(",")).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`;

  console.log("Fetching OSRM:", url);
  const response = await axios.get(url, { timeout: 10000 });
  const data = response.data;

  if (!data.routes || data.routes.length === 0) {
    throw new Error("Không tìm thấy route phù hợp");
  }

  const route = data.routes[0];
  return {
    distance: route.distance,
    duration: route.duration,
    polyline: route.geometry.coordinates,
  };
};
