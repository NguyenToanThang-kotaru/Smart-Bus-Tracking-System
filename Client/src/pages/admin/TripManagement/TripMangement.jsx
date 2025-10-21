import MapView from "@/components/MapView";

export default function Dashboard() {
  // Dữ liệu tuyến (dùng cho bản đồ)
  const routePoints = [
    [10.762622, 106.660172],
    [10.7635, 106.665],
    [10.764, 106.67],
    [10.766, 106.672],
    [10.768, 106.675],
  ];

  const markers = [
    {
      position: [10.762622, 106.660172],
      label: "Bắt đầu hành trình",
      icon: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    },
    {
      position: [10.768, 106.675],
      label: "Kết thúc hành trình",
      icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
  ];

  // Danh sách thông tin nhiều chuyến xe
  const trips = [
    { bus: "Bus ABC", station: "Trạm số 3", status: "Hoàn thành" },
    { bus: "Bus XYZ", station: "Trạm số 1", status: "Đang di chuyển" },
    { bus: "Bus 12A", station: "Trạm số 5", status: "Chưa khởi hành" },
  ];

  return (
    <div className="flex h-full gap-4 p-4 select-none">
      {/* Cột trái: Bản đồ */}
      <div className="flex-1 z-0">
        <MapView routePoints={routePoints} markers={markers} />
      </div>

      {/* Cột phải: Danh sách thông tin hành trình */}
      <div className="w-1/3 h-full bg-white rounded-xl shadow p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Thông tin hành trình</h2>

        {trips.map((trip, idx) => (
          <div
            key={idx}
            className="border-b border-gray-200 pb-3 mb-3 last:border-none last:pb-0 last:mb-0"
          >
            <p>
              Xe: <b>{trip.bus}</b>
            </p>
            <p>
              Đã đến: <b>{trip.station}</b>
            </p>
            <p>
              Trạng thái:{" "}
              <span
                className={
                  trip.status === "Hoàn thành"
                    ? "text-green-600 font-semibold"
                    : trip.status === "Đang di chuyển"
                    ? "text-yellow-600 font-semibold"
                    : "text-gray-500 font-semibold"
                }
              >
                {trip.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
