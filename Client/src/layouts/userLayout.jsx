import { useEffect, useState } from "react";
import MapView from "@/components/MapView";
import axiosClient from "../middleware/axiosClient";
import { io } from "socket.io-client";
import MarkerIcon from "@/assets/Icon/map-marker.png";
import homeIcon from "@/assets/Icon/home-icon.png";

const socket = io("http://localhost:3700");

export default function UserLayout() {
  const [routePoints, setRoutePoints] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [busPosition, setBusPosition] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [visitedStations, setVisitedStations] = useState([]);
  let First = 0
  let Last = 0
  function isNearStation(busPos, station, threshold = 0.005) {
    // busPos: [lat, lon], station: {ViDo, KinhDo}
    if (station.TenTram == "Start" && First == 1)
      return false
    if (station.TenTram == "End" && Last ==1)
      return false
    const [lat1, lon1] = busPos;
    const lat2 = station.ViDo;
    const lon2 = station.KinhDo;

    const distance = Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2);
    return distance < threshold;
  }


  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("isUser"));

    const fetchTrips = async () => {
      try {
        // 1) Lấy lịch trình phụ huynh
        const res = await axiosClient.post("/trips/getLichTrinhByPhuHuynh", {
          TenDangNhap: user.TenDangNhap,
        });

        const tripList = res.data.data;
        if (!tripList || tripList.length === 0) return;

        // 2) Lấy chi tiết trạm theo MaLT của chuyến đầu
        const res2 = await axiosClient.post("/trips/getLichTrinhByMa", {
          MaLT: tripList[0].MaLT,
        });

        const tramList = res2.data;
        if (!tramList || tramList.length === 0) return;

        // 3) Chuẩn hóa dữ liệu trạm
        const stations = tramList.map((t) => ({
          TenTram: t.TenTram,
          ViDo: parseFloat(t.x), // latitude
          KinhDo: parseFloat(t.y), // longitude
        }));

        const start = { TenTram: "Start", ViDo: 10.760001410996209, KinhDo: 106.68220465073534 };
        const end = { TenTram: "End", ViDo: 10.760001410996209, KinhDo: 106.68220465073534 };

        // Thêm vào mảng stations
        const updatedStations = [start, ...stations, end];



        // 5) Tạo markers
        const markersData = updatedStations.map((s, idx) => ({
          position: [s.ViDo, s.KinhDo],
          label:
            idx === 0
              ? "Điểm xuất phát"
              : idx === updatedStations.length - 1
                ? "Điểm kết thúc"
                : s.TenTram || `Trạm ${idx + 1}`,
          icon: idx === 0 || idx === updatedStations.length - 1 ? homeIcon : MarkerIcon,
        }));
        setMarkers(markersData);

        // 6) Join socket room
        socket.emit("join_bus", {
          busId: tramList[0].SoXeBuyt,
          stations: updatedStations,
        });

        socket.on("bus_polyline", (data) => {
          if (data.polyline) {
            const points = data.polyline.map(([lon, lat]) => [lat, lon]);
            console.log(points)
            setRoutePoints(points);
          }
        });

        // 7) Lắng nghe vị trí xe
        socket.on("bus_position", (pos) => {
          const busPos = [pos.lat, pos.lon];
          setBusPosition(busPos);

          // Kiểm tra từng trạm
          updatedStations.forEach((station) => {

            if ((station.TenTram) == "Start" && isNearStation(busPos, station)) {
              setNotifications((prev) => {
                const newMessage = `Xe bắt đầu di chuyển`;
                setVisitedStations(station)
                if (prev.includes(newMessage)) return prev; // chặn trùng
                First = 1
                return [...prev, newMessage];
              });
            }

            
            if (
              !visitedStations.includes(station.TenTram) &&
              isNearStation(busPos, station)
            ) {

              // 1️ Lưu trạm đã đi qua trước
              console.log(station)
              setVisitedStations((prev) => [...prev, station.TenTram]);

              // 2️ Thêm thông báo "đã đến"
              setNotifications((prev) => {
                const newMessage = `Xe sắp đến trạm: ${station.TenTram}`;

                if (prev.includes(newMessage)) return prev; // chặn trùng

                return [...prev, newMessage];
              });

            }
          });
        });


        return () => {
          // socket.emit("leave_bus", selectedBus.bus);
          socket.off("bus_polyline");
          socket.off("bus_position");  // <- OFF LUÔN ĐÂY
          // socket.off("bus_error");
        };
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchTrips();
  }, []);


  return (
    <div className="flex flex-col items-center bg-white min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Bản đồ */}
      <div className="w-full h-[400px] max-w-6xl mt-6 shadow-md rounded-xl ">
        <MapView
          routePoints={routePoints}
          markers={markers}
          busPosition={busPosition}
        />
      </div>

      {/* Thông báo */}
      <div className="border-2 border-[#F2BA1D] rounded-xl mt-6 px-4 sm:px-6 py-4 text-center text-[#0D2346] w-full max-w-4xl bg-white shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          🚍 Thông báo hành trình
        </h2>
        <div className="text-sm sm:text-base text-gray-600 flex flex-col gap-1">
          {notifications.length === 0 ? (
            <p>Xe sắp đến hiển thị tại đây theo thời gian thực.</p>
          ) : (
            notifications.map((note, idx) => <p key={idx}> {note}</p>)
          )}
        </div>
      </div>

    </div>
  );
}
