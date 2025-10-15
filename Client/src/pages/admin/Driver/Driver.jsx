import SearchBar from "@/Components/searchBar";
import eye from "@/assets/Icon/Eye.png";
import edit from "@/assets/Icon/Edit.png";
import DeleteIcon from "@/assets/Icon/delete.png";
import right from "@/assets/Icon/arrow_right.png";
import left from "@/assets/Icon/arrow_left.png";

export default function Dashboard() {
  const shifts = [
    { id: 1, name: "CA 1", time: "6h00 đến 7h00" },
    { id: 2, name: "CA 2", time: "11h00 đến 12h00" },
    { id: 3, name: "CA 3", time: "12h00 đến 13h00" },
    { id: 4, name: "CA 4", time: "17h30 đến 18h30" },
  ];

  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

  return (
    <div className="p-4">
      {/* Thanh search */}
      <div className="mb-5 ml-10 mr-10">
        <SearchBar />
      </div>

      {/* Flex chứa mũi tên + bảng */}
      <div className="flex items-center justify-center gap-3 w-full overflow-x-auto">
        {/* Nút mũi tên trái */}
        <button className="flex-shrink-0 bg-white shadow rounded-full p-1 hover:scale-110 transition-transform">
          <img src={left} alt="Left Arrow" className="w-6 h-6" />
        </button>

        {/* Bảng */}
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full border border-gray-300 text-center text-sm">
            <thead className="bg-mainBlue text-white">
              <tr>
                <th className="border px-3 py-2">
                  LỊCH TRÌNH <br /> TÀI XẾ
                </th>
                {days.map((day) => (
                  <th key={day} className="border px-3 py-2">
                    {day}
                    <br />
                    <span className="text-xs text-gray-200">DD/MM/YYYY</span>
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

                  {days.map((day) => (
                    <td key={day} className="border py-3">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-gray-800 font-medium">Tên tài xế</p>
                        <p className="text-gray-600 text-xs">Số xe buýt</p>
                        <p className="text-gray-600 text-xs">Tên tuyến đường</p>

                        <div className="flex gap-2 mt-2">
                          <button className="hover:bg-blue-800 text-white p-1 rounded">
                            <img src={eye} alt="eye" className="w-4 h-4" />
                          </button>
                          <button className="hover:bg-yellow-600 text-white p-1 rounded">
                            <img src={edit} alt="edit" className="w-4 h-4" />
                          </button>
                          <button className="hover:bg-red-700 text-white p-1 rounded">
                            <img src={DeleteIcon} alt="delete" className="w-4 h-4" />
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

        {/* Nút mũi tên phải */}
        <button className="flex-shrink-0 bg-white shadow rounded-full p-1 hover:scale-110 transition-transform">
          <img src={right} alt="Right Arrow" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
