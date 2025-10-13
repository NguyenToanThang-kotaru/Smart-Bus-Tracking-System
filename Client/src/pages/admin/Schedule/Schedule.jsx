import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Table from "@/Components/table_cpn";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import eye from "@/assets/Icon/Eye.png";
import edit from "@/assets/Icon/Edit.png";
import DeleteIcon from "@/assets/Icon/delete.png";
import { Search, Bus, Route } from "lucide-react";


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
          Lịch trình Content
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

// Popup thêm phân công

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
