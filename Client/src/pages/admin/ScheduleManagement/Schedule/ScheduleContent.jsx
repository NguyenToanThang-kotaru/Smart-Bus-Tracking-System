import { useState } from "react";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import ScheduleForm from "./ScheduleForm";

export default function ScheduleContent() {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const handleEdit = (item) => {
    setMode("edit");
    setSelected(item);
    setShowForm(true);
  };

  const handleView = (item) => {
    setMode("view");
    setSelected(item);
    setShowForm(true);
  };

  const handleDelete = (itemKey) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch trình này?")) {
    alert(`Đã xóa: ${itemKey}`);
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

  const scheduleData = {
    "CA 1_2025-10-20": { driver: "Nguyễn Văn A", bus: "51B-12345", route: "Tuyến 1: BX - Trường Học" },
    "CA 2_2025-10-21": { driver: "Trần Thị B", bus: "51B-54321", route: "Tuyến 2: Chợ - KCN" },
    "CA 3_2025-10-22": { driver: "Lê Văn C", bus: "51C-11111", route: "Tuyến 3: Trung Tâm - Sân Bay" },
    "CA 1_2025-10-23": { driver: "Phạm Văn D", bus: "51D-22222", route: "Tuyến 4: Bến Xe - BV" },
    "CA 4_2025-10-25": { driver: "Nguyễn Thị E", bus: "51E-33333", route: "Tuyến 5: KCN - ĐH Quốc Gia" },
    "CA 3_2025-10-14": { driver: "Nguyễn Văn A", bus: "51B-12345", route: "Tuyến 1: BX - Trường Học" },
    "CA 4_2025-10-13": { driver: "Trần Thị B", bus: "51B-54321", route: "Tuyến 2: Chợ - KCN" },
    "CA 1_2025-10-15": { driver: "Lê Văn C", bus: "51C-11111", route: "Tuyến 3: Trung Tâm - Sân Bay" },
    "CA 2_2025-10-16": { driver: "Phạm Văn D", bus: "51D-22222", route: "Tuyến 4: Bến Xe - BV" },
    "CA 3_2025-10-17": { driver: "Nguyễn Thị E", bus: "51E-33333", route: "Tuyến 5: KCN - ĐH Quốc Gia" },
  };

  const prevWeek = () => setWeekOffset(weekOffset - 1);
  const nextWeek = () => setWeekOffset(weekOffset + 1);

  return ( <div className="relative"> <div className="relative overflow-x-auto p-10 pt-0"> <button
        onClick={prevWeek}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800"
      > <ChevronLeft size={24} /> </button> <button
        onClick={nextWeek}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-mainBlue text-white p-2 rounded-full shadow-md hover:bg-blue-800"
      > <ChevronRight size={24} /> </button>

      <div className="text-center mb-4 text-mainBlue font-bold text-lg">
        Tuần {startOfWeek.format("DD/MM")} - {startOfWeek.add(5, "day").format("DD/MM/YYYY")}
      </div>

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
                <span className="text-xs text-gray-200">{day.format("DD/MM/YYYY")}</span>
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
                const data = scheduleData[key];
                return (
                  <td key={index} className="border py-3 w-[180px]">
                    {data ? (
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-gray-800 font-medium">{data.driver}</p>
                        <p className="text-gray-600 text-xs">{data.bus}</p>
                        <p className="text-gray-600 text-xs">{data.route}</p>
                        <div className="flex gap-2 mt-2">
                          <img
                            src={view}
                            alt="view"
                            className="w-4 h-4 cursor-pointer"
                            onClick={() =>
                              handleView({ ...data, shift: shift.name, date: day.format("YYYY-MM-DD") })
                            }
                          />
                          <img
                            src={edit}
                            alt="edit"
                            className="w-4 h-4 cursor-pointer"
                            onClick={() =>
                              handleEdit({ ...data, shift: shift.name, date: day.format("YYYY-MM-DD") })
                            }
                          />
                          <img
                            src={del}
                            alt="delete"
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => handleDelete(key)}
                          />
                        </div>
                      </div>
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
    </div>

    {showForm && <ScheduleForm onClose={handleClose} mode={mode} data={selected} />}
  </div>


  );
}
