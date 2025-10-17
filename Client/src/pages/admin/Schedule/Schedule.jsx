import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Table from "@/Components/table_cpn";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import eye from "@/assets/Icon/Eye.png";
import edit from "@/assets/Icon/Edit.png";
import DeleteIcon from "@/assets/Icon/delete.png";
import { Search, Bus, Route } from "lucide-react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Dashboard() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="PhanCong" className="w-full h-full">
        {/* Thanh Tab */}
        <TabsList className="bg-white shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-full flex justify-start align-middle rounded-none gap-5 h-1/15 p-2 px-5">
          {[
            ["PhanCong", "Phân công"],
            ["LichTrinh", "Lịch trình"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-none max-w-40 text-left px-1 justify-start flex-shrink-0 border-b-2 border-transparent text-xl
                relative hover:text-mainYellow cursor-pointer font-bold text-mainBlue focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-none data-[state=active]:shadow-none data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-[2px] data-[state=active]:after:bg-mainBlue"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Nội dung từng tab */}
        <TabsContent value="PhanCong" className="p-5 pt-0">
          <PhanCong />
        </TabsContent>

        <TabsContent value="LichTrinh" className="p-5">
          <LichTrinh />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Component: Phân công

function PhanCong() {
  
  const [showAddPopup, setShowAddPopup] = useState(false);  // popup thêm phân công

  const assignments = [
    { id: "PC001", name: "Nguyễn Văn A", role: "Tài xế", route: "Tuyến 01", status: "Đang hoạt động" },
    { id: "PC002", name: "Trần Thị B", role: "Giáo viên phụ trách", route: "Tuyến 02", status: "Tạm nghỉ" },
    { id: "PC003", name: "Lê Văn C", role: "Tài xế", route: "Tuyến 03", status: "Đang hoạt động" },
  ];
  
  return (
    <div>
      {/* Thanh search + nút thêm */}
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar/>
        <AddButton label="Thêm phân công" onClick={() => setShowAddPopup(true)} />
      </div>
                
      {/* Bảng dữ liệu */}
      <div className="mt-10">
        <Table
          data={assignments.map((a) => ({
            Mã: a.id,
            HọTên: a.name,
            VaiTrò: a.role,
            Tuyến: a.route,
            TrạngThái: a.status,
            HànhĐộng: (
              <div className="flex items-center gap-3 text-mainYellow">
                <button>
                  <img src={edit} alt="edit" className="w-6 h-6" />
                </button>
                <button>
                  <img src={eye} alt="eye" className="w-6 h-6" />
                </button>
                <button>
                  <img src={DeleteIcon} alt="delete" className="w-6 h-6" />
                </button>
              </div>
            ),          
          }))}  
        />

        {/* Popup thêm phân công */}
        {showAddPopup && <AddPhanCongPopup onClose={() => setShowAddPopup(false)} />}
      </div>
    </div>
  );
}

// Component: Lịch trình
/* */
function LichTrinh() {
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
                          <img src={eye} alt="eye" className="w-4 h-4" />
                        </button>
                        <button className=" hover:bg-yellow-600 text-white p-1 rounded">
                          <img src={edit} alt="edit" className="w-4 h-4" />
                        </button>
                        <button className="  hover:bg-red-700 text-white p-1 rounded">
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
    </div>
  );
}



function AddPhanCongPopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-mainBlue border-b pb-2 text-center">
          Thêm Phân Công
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Mã phân công</label>
            <input
              type="text"
              placeholder="Nhập mã phân công"
              className="border rounded-lg px-3 py-2 w-full focus:outline-mainYellow"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tài xế</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Chọn tài xế"
                className="border rounded-lg px-3 py-2 w-full pr-10 focus:outline-mainYellow"
              />
              <Search className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Xe buýt</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Chọn xe buýt"
                className="border rounded-lg px-3 py-2 w-full pr-10 focus:outline-mainYellow"
              />
              <Bus className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tuyến đường</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Chọn tuyến đường"
                className="border rounded-lg px-3 py-2 w-full pr-10 focus:outline-mainYellow"
              />
              <Route className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-5">
          <button
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500"
          >
            Xác nhận
          </button>
          <button
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-4 py-2 rounded hover:bg-blue-900"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
