"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

export default function BusMap({ from, to }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001/bus"); // namespace /bus

    // Yêu cầu server tính tuyến đường
    socket.emit("joinBusRoute", { 
      from: `${from[1]},${from[0]}`, 
      to: `${to[1]},${to[0]}` 
    });

    // Nhận toàn bộ polyline
    socket.on("busRouteData", (geometry) => {
      setRoute(geometry.coordinates);
    });

    // Nhận vị trí realtime (server emit mỗi vài giây)
    socket.on("busPosition", (pos) => {
      if (markerRef.current) {
        markerRef.current.setLatLng([pos.lat, pos.lng]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [from, to]);

  useEffect(() => {
    if (route.length === 0) return;

    import("leaflet").then((L) => {
      if (mapRef.current) mapRef.current.remove();

      const map = L.map("map").setView([route[0][1], route[0][0]], 1);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      const polyline = L.polyline(route.map(([lng, lat]) => [lat, lng]), {
        color: "blue",
        weight: 4,
      }).addTo(map);
      map.fitBounds(polyline.getBounds());

      const busIcon = L.icon({
        iconUrl: "/icon/bus.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker([route[0][1], route[0][0]], { icon: busIcon }).addTo(map);

      markerRef.current = marker;
      mapRef.current = map;
    });
  }, [route]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div id="map" className="w-full h-[70vh] sm:h-[500px]"></div>
    </div>
  );
}
