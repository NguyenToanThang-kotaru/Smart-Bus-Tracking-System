import BusMap from "../../components/BusMap";

export default function BusMapPage() {
  const from = [10.760001411003065, 106.68221538137671];
  const to = [10.779420196727663, 106.68432869492851];
  return <BusMap from={from} to={to} />;
}
