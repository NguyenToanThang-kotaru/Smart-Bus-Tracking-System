import { useState } from "react";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

export default function ScheduleContent() {
  const shifts = [
    { id: 1, name: "CA 1", time: "6h00 đến 7h00" },
    { id: 2, name: "CA 2", time: "11h00 đến 12h00" },
    { id: 3, name: "CA 3", time: "12h00 đến 13h00" },
    { id: 4, name: "CA 4", time: "17h30 đến 18h30" },
  ];

  const [weekOffset, setWeekOffset] = useState(0);

  //  Tính toán tuần hiện tại 
  const today = dayjs().add(weekOffset, "week");
  const startOfWeek = today.startOf("week").add(1, "day"); // Thứ 2
  const days = Array.from({ length: 6 }, (_, i) => startOfWeek.add(i, "day")); // Thứ 2 → Thứ 7

  //  Chuyển tuần
  const prevWeek = () => setWeekOffset(weekOffset - 1);
  const nextWeek = () => setWeekOffset(weekOffset + 1);

  return (
    <div className="relative">
      {/* Thanh tìm kiếm + nút thêm
      <div className="flex px-10 gap-10 mb-5">
        <SearchBar />
        <AddButton />
      </div> */}

      <div className=" relative overflow-x-auto p-10 pt-0">
        {/*  Mũi tên chuyển tuần */}
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

        {/*  Hiển thị tuần hiện tại */}
        <div className="text-center mb-4 text-mainBlue font-bold text-lg">
          Tuần {startOfWeek.format("DD/MM")} - {startOfWeek.add(5, "day").format("DD/MM/YYYY")}
        </div>

        {/*  Bảng lịch */}
        <table className="min-w-full border border-gray-300 text-center text-sm">
          <thead className="bg-mainBlue text-white">
            <tr>
              <th className="border px-3 py-2 w-[160px]">
                LỊCH TRÌNH <br /> TÀI XẾ
              </th>
              {days.map((day, index) => (
                <th key={index} className="border px-3 py-2">
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
                <td className="border font-semibold py-4">
                  {shift.name}
                  <br />
                  <span className="text-gray-600 text-xs">({shift.time})</span>
                </td>

                {days.map((_, index) => (
                  <td key={index} className="border py-3">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-gray-800 font-medium">Tên tài xế</p>
                      <p className="text-gray-600 text-xs">Số xe buýt</p>
                      <p className="text-gray-600 text-xs">Tên tuyến đường</p>

                      <div className="flex gap-2 mt-2">
                        <button className=" hover:bg-blue-800 text-white p-1 rounded">
                          <img src={view} alt="eye" className="w-4 h-4" />
                        </button>
                        <button className=" hover:bg-yellow-600 text-white p-1 rounded">
                          <img src={edit} alt="edit" className="w-4 h-4" />
                        </button>
                        <button className="  hover:bg-red-700 text-white p-1 rounded">
                          <img src={del} alt="delete" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}