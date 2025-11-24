const { fetchPolyline } = require("../services/osrm.service");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // Khi client chọn 1 bus cụ thể
    socket.on("join_bus", async (data) => {
      try {
        const { busId, stations } = data;
        if (!busId || !stations || stations.length < 2) {
          return socket.emit("bus_error", {
            error: "Thiếu thông tin busId hoặc danh sách trạm",
          });
        }
        console.log(data)
        // Tham gia room riêng cho bus đó
        socket.join(busId);
        console.log(`🚍 ${socket.id} joined bus room: ${busId}`);

        // Chuyển danh sách trạm thành mảng toạ độ [kinh độ, vĩ độ]
        let coords = stations.map(s => [
          parseFloat(s.KinhDo),
          parseFloat(s.ViDo),
        ]);

        // Gọi OSRM để lấy polyline
        const polylineData = await fetchPolyline(coords);

        // Gửi về cho tất cả client trong room busId
        io.to(busId).emit("bus_polyline", {
          busId,
          ...polylineData,
        });
      } catch (err) {
        console.error("❌ Lỗi lấy polyline:", err.message);
        socket.emit("bus_error", { error: err.message });
      }
    });

    socket.on("leave_bus", (busId) => {
      socket.leave(busId);
      console.log(`🚪 ${socket.id} left bus room: ${busId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};