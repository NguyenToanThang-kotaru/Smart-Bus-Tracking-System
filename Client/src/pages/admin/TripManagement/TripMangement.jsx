import { useEffect, useState } from "react";
import axiosClient from "../../../middleware/axiosClient";
import MapView from "@/components/MapView";
import Marker from "@/assets/Icon/map-marker.png";
import busIcon from "@/assets/Icon/map-bus.png";
import { data } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3700");

export default function Dashboard() {
  // ====== STATE ======
  const [selectedBus, setSelectedBus] = useState(null);
  const [busRoutes, setBusRoutes] = useState([]);
  const [routePoints, setRoutePoints] = useState([])

  // ====== FETCH API ======
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axiosClient.get("/trips/getalltrip");
        let data = res.data;
        console.log(res.data);

        const formatted = data.map((trip) => {
          // Lấy danh sách trạm
          let stations = trip.TramList || [];

          // Tạo danh sách tọa độ từ trạm
          let coords = stations.map((s) => [
            parseFloat(s.KinhDo),
            parseFloat(s.ViDo),
          ]);

          // ===== Thêm tọa độ đầu & cuối mặc định =====
          const start = [106.68220465073534, 10.760001410996209]; // [lon, lat]
          const end = [106.68220465073534, 10.760001410996209];   // [lon, lat]
          coords = [start, ...coords, end];

          // Cập nhật lại danh sách trạm (nếu muốn marker hiển thị cả 2 đầu)
          const updatedStations = [
            { TenTram: "Bến đầu", KinhDo: start[0], ViDo: start[1] },
            ...stations,
            { TenTram: "Bến cuối", KinhDo: end[0], ViDo: end[1] },
          ];

          return {
            bus: trip.SoXeBuyt,
            status:
              trip.TrangThai === "0"
                ? "Chưa khởi hành"
                : trip.TrangThai === "1"
                  ? "Đang di chuyển"
                  : "Hoàn thành",
            stations: updatedStations,
            coords, // có thể dùng sau cho polyline
          };
        });

        setBusRoutes(formatted);
        if (formatted.length > 0) {
          setSelectedBus(formatted[0]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chuyến:", error);
      }
    };

    fetchTrips();
  }, []);


  useEffect(() => {
    //  Khúc này lấy api tĩnh từ Server thay vì socket
    // coordsReady = selectedBus.coords.map(toado => [
    //   parseFloat(toado.ViDo),
    //   parseFloat(toado.KinhDo),
    // ])

    console.log("xe bus: ",selectedBus)
    // const fetchPolyLine = () => {
    //   const res = axiosClient.post('routes/get-polyline',selectedBus.coords)
    //   let data = res.data
    //   console.log("data: ", data)
    // }
    // fetchPolyLine()
    if (!selectedBus) return;
    // Emit lên server
    socket.emit("join_bus", {
      busId: selectedBus.bus,
      stations: selectedBus.stations,
    });
    
    // Khi server gửi polyline về
    socket.on("bus_polyline", (data) => {
      console.log("📦 Nhận polyline từ server:", data);
      if (data.polyline) {
        const points = data.polyline.map(([lon, lat]) => [lat, lon]);
        setRoutePoints(points);
      }
    });

    socket.on("bus_error", (err) => {
      console.error("Lỗi bus:", err);
    });

    // Rời khỏi room khi đổi bus hoặc unmount
    return () => {
      socket.emit("leave_bus", selectedBus.bus);
      socket.off("bus_polyline");
      socket.off("bus_error");
    };
  }, [selectedBus]);


  const markers = selectedBus?.stations?.map((station, idx) => ({
    position: [parseFloat(station.ViDo), parseFloat(station.KinhDo)],
    label:
      idx === 0
        ? "Điểm xuất phát"
        : idx === selectedBus.stations.length - 1
          ? "Điểm xuất phát"
          : `📍 ${station.TenTram || `Trạm ${idx + 1}`}`,
    icon:
      idx === 0
        ? busIcon
        : idx === selectedBus.stations.length - 1
          ? busIcon
          : Marker, // hoặc để sau đổi icon khác cho trạm giữa
  }));



  return (
    <div className="flex h-full gap-4 p-4 select-none">
      {/* BẢN ĐỒ BÊN TRÁI */}
      <div className="flex-1 z-0">
        <MapView routePoints={routePoints} markers={markers} />
      </div>

      {/* THANH THÔNG TIN BÊN PHẢI */}
      <div className="w-1/3 h-full bg-white rounded-xl shadow p-4 font-bold overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">🚍 Danh sách xe & trạm</h2>

        {busRoutes.length === 0 ? (
          <p className="text-gray-500 text-center">Không có chuyến nào hôm nay.</p>
        ) : (
          busRoutes.map((bus, idx) => (
            <div
              key={idx}
              className="mb-4 border-b border-gray-200 pb-3 last:border-none hover:opacity-50 cursor-pointer last:pb-0"
              onClick={() => setSelectedBus(bus)}
            >
              {/* Tên xe + trạng thái */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-xl text-[#0D2346]">{bus.bus}</p>
                <span
                  className={`text-sm font-semibold ${bus.status === "Hoàn thành"
                    ? "text-green-600"
                    : bus.status === "Đang di chuyển"
                      ? "text-yellow-600"
                      : "text-gray-500"
                    }`}
                >
                  {bus.status}
                </span>
              </div>

              {/* Danh sách trạm */}
              <ul className="pl-4 border-l-2 border-gray-300">
                {bus.stations
                  .filter((_, sIdx) => sIdx !== 0 && sIdx !== bus.stations.length - 1)
                  .map((station, sIdx) => (
                    <li key={sIdx} className="text-sm text-gray-700 mb-1">
                      • {station.TenTram}
                    </li>
                  ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
