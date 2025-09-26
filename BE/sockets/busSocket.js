const busService = require("../services/bus/busService");

// Bộ nhớ tạm ở server (demo, production thì có thể dùng Redis)
let busState = {
  route: null,
  index: 0,
  interval: null,
};

function busSocket(io) {
  io.of("/bus").on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinBusRoute", async ({ from, to }) => {
      // Nếu chưa có route thì khởi tạo
      if (!busState.route) {
        const fromArr = from.split(",").map(Number);
        const toArr = to.split(",").map(Number);
        const geometry = await busService.getBusRoute(fromArr, toArr);
        busState.route = geometry;
        busState.index = 0;

        // Xe chạy liên tục ở server (không phụ thuộc client)
        // Server
        busState.interval = setInterval(() => {
          if (busState.index >= busState.route.coordinates.length - 1) {
            busState.index = 0;
          }

          const [lng1, lat1] = busState.route.coordinates[busState.index];
          const [lng2, lat2] = busState.route.coordinates[busState.index + 1];

          // số frame muốn chia nhỏ (vd: 20 bước trong 2s => 100ms/bước)
          let step = 0;
          const totalSteps = 20;
          const stepInterval = setInterval(() => {
            if (step >= totalSteps) {
              clearInterval(stepInterval);
              return;
            }
            const t = step / totalSteps;
            const lng = lng1 + (lng2 - lng1) * t;
            const lat = lat1 + (lat2 - lat1) * t;
            io.of("/bus").emit("busPosition", { lng, lat });
            step++;
          }, 100); // 100ms/frame
          busState.index++;
        }, 2000); // move mỗi 2s sang đoạn kế tiếp
      }

      // Gửi toàn bộ tuyến cho client
      socket.emit("busRouteData", busState.route);

      // Gửi vị trí hiện tại ngay lập tức
      const [lng, lat] = busState.route.coordinates[busState.index];
      socket.emit("busPosition", { lng, lat });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      // Không clearInterval nữa, vì ta muốn bus tiếp tục chạy cho client khác
    });
  });
}

module.exports = busSocket;
