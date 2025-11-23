const cron = require("node-cron");
const dayjs = require("dayjs");
const axios = require("axios");
const { fetchPolyline } = require("../services/osrm.service");
const Redis = require("ioredis");
const redis = new Redis(); // mặc định localhost:6379
// redis.on("connect", () => console.log("✅ Redis connected"));
// redis.on("error", (err) => console.error("❌ Redis error:", err));


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
        let index = 0;
        const interval = setInterval(() => {
            if (index >= polyline.length) {
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

            const point = polyline[index];
            io.to(trip.SoXeBuyt).emit("bus_position", { lat: point[1], lon: point[0] });
            console.log(trip.SoXeBuyt + "Point: " + point)

            index++;
        }, 1000);

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


