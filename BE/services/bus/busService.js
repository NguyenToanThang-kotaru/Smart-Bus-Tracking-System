const axios = require("axios");

async function getBusRoute(from, to) {
  try {
    // from, to là [lng, lat] array
    const url = `https://router.project-osrm.org/route/v1/driving/${from[0]},${from[1]};${to[0]},${to[1]}?overview=full&geometries=geojson`;

    const response = await axios.get(url);
    if (response.data.routes && response.data.routes.length > 0) {
      return response.data.routes[0].geometry; // Trả về GeoJSON của route
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get route");
  }
}

module.exports = { getBusRoute };
