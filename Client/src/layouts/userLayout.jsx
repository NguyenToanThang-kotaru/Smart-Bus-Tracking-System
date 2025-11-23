import { useEffect, useState } from "react";
import MapView from "@/components/MapView";

import io from "socket.io-client";

export default function UserLayout() {
  const [routePoints, setRoutePoints] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [busPosition, setBusPosition] = useState(null);

  useEffect(() => {
    // const socket = io("http://localhost:5000");
    const user = JSON.parse(sessionStorage.getItem("isUser"));

    console.log("Phụ huynh là " + user.TenDangNhap);


    // socket.on("bus-location", (data) => {
    //   setBusPosition([data.lat, data.lng]);
    // });

    // return () => socket.disconnect();
  }, []);

  

  return (
    <div className="flex flex-col items-center bg-white min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Bản đồ */}
      <div className="w-full h-full max-w-6xl mt-6 shadow-md rounded-xl ">
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
        <p className="text-sm sm:text-base text-gray-600">
          Xe sắp đến / đến trễ sẽ được hiển thị tại đây theo thời gian thực.
        </p>
      </div>
    </div>
  );
}
