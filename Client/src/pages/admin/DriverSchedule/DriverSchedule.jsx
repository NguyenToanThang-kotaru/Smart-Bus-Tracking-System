import SearchBar from "@/Components/searchBarComponent";
import view from "@/assets/Icon/viewYellow.png";
import right from "@/assets/Icon/arrow_right.png";
import left from "@/assets/Icon/arrow_left.png";
import ViewScheduleDetail from "./ViewScheduleDetail";
import axiosClient from "@/middleware/axiosClient";
import { useState, useEffect } from "react";

export default function DriverSchedule() {
  const [weekOffset, setWeekOffset] = useState(0);

  const handlePrevWeek = () => setWeekOffset(prev => prev - 1);
  const handleNextWeek = () => setWeekOffset(prev => prev + 1);

  return (
    <div className="p-4">
      <div className="mb-5 ml-10 mr-10">
        <SearchBar />
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        <button
          onClick={handlePrevWeek}
          className="flex-shrink-0 bg-white shadow rounded-full p-1 hover:scale-110 transition-transform cursor-pointer"
        >
          <img src={left} className="w-6 h-6" />
        </button>

        <div className="overflow-x-auto flex-1">
          <TableSchedule week={weekOffset} />
        </div>

        <button
          onClick={handleNextWeek}
          className="flex-shrink-0 bg-white shadow rounded-full p-1 hover:scale-110 transition-transform cursor-pointer"
        >
          <img src={right} className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}



function TableSchedule({ week }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const handleView = (item) => {
    setSelected(item);
    setShowPopup(true);
  };

  // LOAD API LỊCH TRÌNH CỦA TÀI XẾ
  useEffect(() => {
    axiosClient.get("/schedule/driver/my")
      .then(res => setSchedule(res.data))
      .catch(err => console.error(err));
  }, []);

  const shifts = [
    { id: 1, name: "CA 1", start: "06:00", end: "07:00" },
    { id: 2, name: "CA 2", start: "11:00", end: "12:00" },
    { id: 3, name: "CA 3", start: "12:00", end: "13:00" },
    { id: 4, name: "CA 4", start: "17:30", end: "18:30" },
  ];

  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  const getWeekDates = (weekOffset) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) + weekOffset * 7;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(week);

  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const getScheduleForCell = (dayDate, shift) => {
    return schedule.filter((s) => {
      const d = new Date(s.NgayHanhTrinh);
      return (
        d.toDateString() === dayDate.toDateString() &&
        s.CaHanhTrinh === shift.name
      );
    });
  };

  return (
    <>
      <table className="min-w-full border border-gray-300 text-center text-sm">
        <thead className="bg-mainBlue text-white">
          <tr>
            <th className="border px-3 py-2">LỊCH TRÌNH <br /> TÀI XẾ</th>
            {days.map((day, index) => (
              <th key={day} className="border px-3 py-2">
                {day}
                <br />
                <span className="text-xs text-gray-200">
                  {formatDate(weekDates[index])}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td className="border font-semibold py-4">
                {shift.name}
                <br />
                <span className="text-gray-600 text-xs">
                  ({shift.start} - {shift.end})
                </span>
              </td>

              {weekDates.map((dayDate) => {
                const cellData = getScheduleForCell(dayDate, shift);

                return (
                  <td key={dayDate} className="border py-3">
                    <div className="min-h-[100px]">
                      {cellData.length > 0 ? (
                        cellData.map((s) => (
                          <div key={s.MaLT} className="flex flex-col items-center gap-1">
                            <p className="text-gray-800 font-medium">{s.TenTX}</p>
                            <p className="text-gray-600 text-xs">{s.SoXB}</p>
                            <p className="text-gray-600 text-xs">{s.TenTD}</p>

                            <div
                              onClick={() => handleView(s)}
                              className="flex w-2/3 mt-2 justify-center bg-[rgb(11,35,71)] cursor-pointer hover:opacity-80"
                            >
                              <img src={view} className="w-4 h-4 p-1" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selected && (
        <ViewScheduleDetail
          item={selected}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}