import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import axiosClient from "@/middleware/axiosClient";
import ScheduleForm from "./ScheduleForm";
import { toast } from "react-toastify";

export default function ScheduleContent() {
  const [rawSchedule, setRawSchedule] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("list");
  
  const [weekOffset, setWeekOffset] = useState(0);
  const today = dayjs().add(weekOffset, "week");
  const startOfWeek = today.startOf("week").add(1, "day");
  const days = Array.from({ length: 6 }, (_, i) => startOfWeek.add(i, "day"));

  const shifts = [
    { id: 1, name: "CA 1", time: "6h00 đến 7h00" },
    { id: 2, name: "CA 2", time: "11h00 đến 12h00" },
    { id: 3, name: "CA 3", time: "12h00 đến 13h00" },
    { id: 4, name: "CA 4", time: "17h30 đến 18h30" },
  ];

  const loadSchedule = async () => {
    try {
      const res = await axiosClient.get("schedule");
      console.log("API /schedule response:", res);
      setRawSchedule(res.data || []);
    } catch (err) {
      toast.error("Lỗi lấy dữ liệu lịch trình!");
      console.error(err);
    }
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  useEffect(() => {
    const map = {};
    rawSchedule.forEach((item) => {
      const date = dayjs(item.NgayHanhTrinh);
      const shift = item.CaHanhTrinh;
      if (
        date.isSame(startOfWeek, "day") ||
        (date.isAfter(startOfWeek.subtract(1, "day")) && date.isBefore(startOfWeek.add(6, "day")))
      ) {
        const key = `${shift}_${date.format("YYYY-MM-DD")}`;
        if (!map[key]) map[key] = [];
        map[key].push({
          driver: item.MaTX,
        bus: item.SoXeBuyt 
          ? `${item.SoXeBuyt} - ${item.BienSoXe}`
          : "N/A",
        route: item.MaTD
          ? `${item.MaTD} - ${item.TenTD}`
          : "N/A",
          MaLT: item.MaLT,
          raw: item
        });
      }
    });
    console.log("schedule keys:", Object.keys(map));
    setSchedule(map);
  }, [weekOffset, rawSchedule]);

  const handleViewCell = (shift, day, trips) => {
    setMode("list");
    setSelected({ shift, date: day.format("DD/MM/YYYY"), trips: trips || [] });
    setShowForm(true);
  };

  const handleClose = () => setShowForm(false);
  return (
    <div className="relative">
      <div className="relative overflow-x-auto p-10 pt-0">
        <button onClick={() => setWeekOffset(w => w - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800">
          <ChevronLeft size={24} />
        </button>
        <button onClick={() => setWeekOffset(w => w + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800">
          <ChevronRight size={24} />
        </button>

        <div className="text-center text-mainBlue font-bold text-lg my-4">
          LỊCH TRÌNH TỪ {startOfWeek.format("DD/MM/YYYY")} - {startOfWeek.add(5, "day").format("DD/MM/YYYY")}
        </div>

        <table className="min-w-full border border-gray-300 text-center text-sm table-fixed">
          <thead className="bg-mainBlue text-white">
            {/* tạo cột header*/}
            <tr> 
              <th className="border px-3 py-2 w-[160px]">LỊCH TRÌNH</th>
              {days.map((day, i) => (
                <th key={i} className="border px-3 py-2 w-[180px]">
                  Thứ {i + 2}<br/><span className="text-xs text-gray-200">{day.format("DD/MM/YYYY")}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {shifts.map(shift => (
              <tr key={shift.id}>
                <td className="border font-semibold py-4 w-[160px]">{shift.name}<br/><span className="text-gray-600 text-xs">({shift.time})</span></td>
                {days.map((day, idx) => {
                  const key = `${shift.name}_${day.format("YYYY-MM-DD")}`;
                  const trips = schedule[key] || [];
                  const total = trips.length;
                  return (
                    <td key={idx} className="border h-[100px] w-[180px] cursor-pointer hover:bg-yellow-100 transition" onClick={() => handleViewCell(shift.name, day, trips)}>
                      {total > 0 ? <p className="font-semibold text-mainBlue">{total} chuyến</p> : <p className="text-gray-400 italic">Trống</p>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && <ScheduleForm onClose={handleClose} mode={mode} data={selected} reload={loadSchedule} />}
    </div>
  );
}