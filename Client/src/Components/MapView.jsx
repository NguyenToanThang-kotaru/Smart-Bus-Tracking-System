import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icon tuỳ chỉnh
const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });
import { useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, [position]);
  return null;
}
export default function MapView({ routePoints, markers }) {
  const defaultCenter = routePoints?.[0] || [10.762622, 106.660172]; // fallback: SG center

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

      {/* Các điểm đánh dấu */}
      {markers &&
        markers.map((m, idx) => (
          <Marker
            key={idx}
            position={m.position}
            icon={createIcon(m.icon || "https://cdn-icons-png.flaticon.com/512/684/684908.png")}
          >
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
