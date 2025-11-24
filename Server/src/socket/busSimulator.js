// busSimulator.js
const busService = require("../../../ZDraft/BE/services/bus/busService");

let busState = {
  route: null,
  index: 0,
  interval: null,
};

async function startBusSimulator(io, fromArr, toArr) {
  // Tránh chạy simulator 2 lần
  if (busState.interval) return;

  // Load route
  const geometry = await busService.getBusRoute(fromArr, toArr);
  busState.route = geometry;
  busState.index = 0;

  console.log("🚍 Bus simulator started");

  // Mô phỏng xe chạy mỗi 2 giây
  busState.interval = setInterval(() => {
    if (busState.index >= busState.route.coordinates.length - 1) {
      busState.index = 0;
    }

    const [lng1, lat1] = busState.route.coordinates[busState.index];
    const [lng2, lat2] = busState.route.coordinates[busState.index + 1];

    // Chia nhỏ mỗi đoạn thành animation mượt
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

      // Emit vị trí xe cho tất cả client đang nghe `/bus`
      io.of("/bus").emit("busPosition", { lng, lat });

      step++;
    }, 100);

    busState.index++;
  }, 2000);
}

module.exports = { startBusSimulator, busState };
