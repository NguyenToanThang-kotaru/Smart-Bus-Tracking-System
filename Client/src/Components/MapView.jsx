import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";  
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import busIcon from "@/assets/Icon/map-bus.png";

// Icon tuỳ chỉnh
const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, [position]);
  return null;
}

export default function MapView({ routePoints, markers, busPosition }) {
  const defaultCenter = routePoints?.[0] || [10.762622, 106.660172];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <RecenterMap position={defaultCenter} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Vẽ tuyến xe */}
      {routePoints && <Polyline positions={routePoints} color="#2D8CFF" weight={5} />}

      {/* Marker tĩnh của trạm */}
      {markers &&
        markers.map((m, idx) => (
          <Marker
            key={idx}
            position={m.position}
            icon={createIcon(m.icon)}
          >
            <Popup>{m.label}</Popup>
          </Marker>
        ))}

      {/* 👇 Marker động của xe buýt */}
      {busPosition && (
        <Marker
          position={busPosition}
          icon={createIcon(busIcon)}
        >
          <Popup>Xe buýt đang di chuyển</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
