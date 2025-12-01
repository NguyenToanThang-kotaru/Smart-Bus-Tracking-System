const cron = require("node-cron");
const dayjs = require("dayjs");
const axios = require("axios");
const { fetchPolyline } = require("../services/osrm.service");
const Redis = require("ioredis");
const redis = new Redis(); // mặc định localhost:6379
// redis.on("connect", () => console.log("✅ Redis connected"));
// redis.on("error", (err) => console.error("❌ Redis error:", err));
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function interpolate(p1, p2, steps) {
    const points = [];

    for (let i = 1; i <= steps; i++) {
        const t = i / (steps + 1);
        const lat = lerp(p1.lat, p2.lat, t);
        const lon = lerp(p1.lon, p2.lon, t);
        points.push({ lat, lon });
    }

    return points;
}


async function handleTripStart(trip, io) {
    try {
        console.log("🚍 Trip started:", trip);
        const start = [106.68220465073534, 10.760001410996209]; // [lon, lat]
        const end = [106.68220465073534, 10.760001410996209];   // [lon, lat]
        // Lấy danh sách tọa độ từ TramList → [ [lon, lat], [lon, lat] ]
        let coords = trip.TramList.map(t => [
            parseFloat(t.KinhDo),  // lon
            parseFloat(t.ViDo)     // lat
        ]);
        coords = [start, ...coords, end];

        // Gọi hàm fetchPolyline
        const route = await fetchPolyline(coords);

        const redisKey = `trip:${trip.MaLT}:route`;
        await redis.set(redisKey, JSON.stringify(route.polyline));
        const polyline = route.polyline; // mảng [ [lon, lat], ... ]
        const STEPS = 5;

        let expandedPolyline = [];

        // polyline gốc: [[lon, lat], ...]
        for (let i = 0; i < polyline.length - 1; i++) {
            const p1 = { lat: polyline[i][1], lon: polyline[i][0] };
            const p2 = { lat: polyline[i + 1][1], lon: polyline[i + 1][0] };

            expandedPolyline.push(p1);

            const mids = interpolate(p1, p2, STEPS); // thêm điểm mượt
            expandedPolyline.push(...mids);
        }

        expandedPolyline.push({
            lat: polyline[polyline.length - 1][1],
            lon: polyline[polyline.length - 1][0]
        });

        let index = 0;

        const interval = setInterval(() => {
            if (index >= expandedPolyline.length) {
                clearInterval(interval);
                console.log(`Trip ${trip.MaLT} đã hoàn thành`);

                io.to(trip.SoXeBuyt).emit("trip_end", {
                    busId: trip.SoXeBuyt,
                    message: "Xe đã kết thúc hành trình"
                });

                axios.post("http://localhost:3700/api/trips/updatestatus", {
                    MaLT: trip.MaLT,
                    TrangThai: "2",
                });

                redis.del(redisKey);
                return;
            }

            const point = expandedPolyline[index];
            io.to(trip.SoXeBuyt).emit("bus_position", {
                lat: point.lat,
                lon: point.lon
            });

            index++;
        }, 200); // mỗi 0.2s 1 bước => mượt hơn

    } catch (err) {
        console.error("Lỗi khi fetch polyline:", err.message);
    }
}

module.exports = function (io) {
    cron.schedule("* * * * * *", async () => {

        try {
            const response = await axios.get("http://localhost:3700/api/trips/getalltrips");
            const tripList = response.data;
            // console.log(tripList)
            const now = dayjs();

            tripList.forEach(async (trip) => {
                const startTime = dayjs(trip.NgayHanhTrinh);

                if (now.isAfter(startTime) && trip.TrangThai === "0") {
                    console.log(`Trip ${trip.SoXeBuyt} bắt đầu hành trình`);

                    handleTripStart(trip, io);

                    await axios.post("http://localhost:3700/api/trips/updatestatus", {
                        MaLT: trip.MaLT,
                        TrangThai: "1",
                    });
                }
            });
        } catch (err) {
            console.error("Cron trip error:", err.message);
        }
    });

    console.log("Trip scheduler started");
};


