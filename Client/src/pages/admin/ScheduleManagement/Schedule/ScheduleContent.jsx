import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import ScheduleForm from "./ScheduleForm";
import axios from "axios";

export default function ScheduleContent() {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("list");

  const [scheduleData, setScheduleData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const apiData = res.data;

      const formatted = {};

      apiData.forEach((item) => {
        const shiftName = item.shiftName || item.shift || item.ca;
        const date = dayjs(item.date).format("YYYY-MM-DD");

        const key = `${shiftName}_${date}`;
        if (!formatted[key]) formatted[key] = [];

        formatted[key].push({
          driver: item.driverName || item.driver || "Chưa có tài xế",
          bus: item.busNumber || item.bus || "Không có xe",
          route: item.routeName || item.route || "Không có tuyến",
        });
      });

      setScheduleData(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Fetch schedule error:", err);
      setLoading(false);
    }
  };

  const handleViewCell = (shift, day, trips) => {
    if (trips && trips.length > 0) {
      setMode("list");
      setSelected({ shift, date: day.format("YYYY-MM-DD"), trips });
      setShowForm(true);
    }
  };

  const handleClose = () => setShowForm(false);

  const shifts = [
    { id: 1, name: "CA 1", time: "6h00 đến 7h00" },
    { id: 2, name: "CA 2", time: "11h00 đến 12h00" },
    { id: 3, name: "CA 3", time: "12h00 đến 13h00" },
    { id: 4, name: "CA 4", time: "17h30 đến 18h30" },
  ];

  const [weekOffset, setWeekOffset] = useState(0);
  const today = dayjs().add(weekOffset, "week");
  const startOfWeek = today.startOf("week").add(1, "day");
  const days = Array.from({ length: 6 }, (_, i) => startOfWeek.add(i, "day"));

  const prevWeek = () => setWeekOffset(weekOffset - 1);
  const nextWeek = () => setWeekOffset(weekOffset + 1);

  return (
    <div className="relative">
      <div className="relative overflow-x-auto p-10 pt-0">
        <button
          onClick={prevWeek}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextWeek}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800"
        >
          <ChevronRight size={24} />
        </button>

        <div className="text-center mb-4 text-mainBlue font-bold text-lg">
          Tuần {startOfWeek.format("DD/MM")} -{" "}
          {startOfWeek.add(5, "day").format("DD/MM/YYYY")}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <table className="min-w-full border border-gray-300 text-center text-sm table-fixed">
            <thead className="bg-mainBlue text-white">
              <tr>
                <th className="border px-3 py-2 w-[160px]">
                  LỊCH TRÌNH <br /> TÀI XẾ
                </th>
                {days.map((day, index) => (
                  <th key={index} className="border px-3 py-2 w-[180px]">
                    {`Thứ ${index + 2}`}
                    <br />
                    <span className="text-xs text-gray-200">
                      {day.format("DD/MM/YYYY")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id} className="border">
                  <td className="border font-semibold py-4 w-[160px]">
                    {shift.name}
                    <br />
                    <span className="text-gray-600 text-xs">({shift.time})</span>
                  </td>

                  {days.map((day, index) => {
                    const key = `${shift.name}_${day.format("YYYY-MM-DD")}`;
                    const trips = scheduleData[key];
                    const totalTrips = trips ? trips.length : 0;

                    return (
                      <td
                        key={index}
                        className={`border h-[100px] w-[180px] cursor-pointer hover:bg-yellow-100 transition`}
                        onClick={() => handleViewCell(shift.name, day, trips)}
                      >
                        {totalTrips > 0 ? (
                          <p className="font-semibold text-mainBlue">
                            {totalTrips} chuyến
                          </p>
                        ) : (
                          <p className="text-gray-400 italic">Trống</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <ScheduleForm onClose={handleClose} mode={mode} data={selected} />
      )}
    </div>
  );
}
