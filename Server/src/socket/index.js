const { fetchPolyline } = require("../services/osrm.service");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("join_bus", async (data) => {
      try {
        const { tripId, stations } = data;

        if (!tripId || !stations || stations.length < 2) {
          return socket.emit("bus_error", {
            error: "Thiếu tripId hoặc danh sách trạm",
          });
        }

        console.log("Client join:", data);

        const room = `trip_${tripId}`;
        socket.join(room);
        console.log(`🚍 ${socket.id} joined room: ${room}`);

        // Tạo list [lon, lat]
        const coords = stations.map(s => [
          parseFloat(s.KinhDo),
          parseFloat(s.ViDo),
        ]);

        // Lấy polyline
        const polylineData = await fetchPolyline(coords);

        // Gửi polyline cho FE
        io.to(room).emit("bus_polyline", {
          tripId,
          ...polylineData
        });

      } catch (err) {
        console.error("❌ Lỗi lấy polyline:", err.message);
        socket.emit("bus_error", { error: err.message });
      }
    });

    socket.on("leave_bus", (tripId) => {
      const room = `trip_${tripId}`;
      socket.leave(room);
      console.log(`🚪 ${socket.id} left room: ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};
