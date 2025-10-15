import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Table from "@/Components/table_cpn";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import edit from "@/assets/Icon/Edit.png";
import eye from "@/assets/Icon/Eye.png";
import DeleteIcon from "@/assets/Icon/delete.png";
import AddTuyenDuong from "./AddTuyenDuong";
import AddTram from "./AddTram";

export default function RouteManagement() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="TuyenDuong" className="w-full h-full">
        {/* Tabs Header */}
        <TabsList className="bg-white shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-full flex justify-start align-middle rounded-none gap-6 h-1/15 p-3 px-6">
          {[
            ["TuyenDuong", "Tuyến đường"],
            ["Tram", "Trạm"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-none max-w-40 text-left px-1 justify-start flex-shrink-0 border-b-2 border-transparent text-xl
                relative hover:text-mainYellow cursor-pointer font-bold text-mainBlue focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-none
                data-[state=active]:shadow-none data-[state=active]:after:content-[''] data-[state=active]:after:absolute 
                data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px]
                data-[state=active]:after:h-[2px] data-[state=active]:after:bg-mainBlue"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="TuyenDuong" className="p-5 pt-0">
          <TuyenDuong />
        </TabsContent>

        <TabsContent value="Tram" className="p-5">
          <Tram />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TuyenDuong() {
  const [routes, setRoutes] = useState([
    { id: "TD001", name: "Tuyến số 1: Bến Thành - Bến xe buýt Chợ Lớn"},
    { id: "TD002", name: "Tuyến số 2: Bến xe buýt Chợ Lớn - Chợ Tân Nhựt"},
    { id: "TD003", name: "Tuyến số 3: Đại học Quốc Gia - Bến xe Miền Tây"},
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowPopup(true);
  };
  const handleEdit = (item) => {
    setMode("edit");
    setSelected(item);
    setShowPopup(true);
  };
  const handleView = (item) => {
    setMode("view");
    setSelected(item);
    setShowPopup(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tuyến đường này?")) {
      setRoutes(routes.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      {/* Thanh tìm kiếm + Thêm */}
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton label="Thêm tuyến đường" onClick={handleAdd} />
      </div>

      {/* Bảng */}
      <div className="mt-10">
        <Table
          data={routes.map((r) => ({
            "Mã tuyến": r.id,
            "Tên tuyến": r.name,
            "Sửa": (
              <button
                onClick={() => handleEdit(r)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={edit} alt="edit" className="w-6 h-6 mx-auto" />
              </button>
            ),
            "Xem": (
              <button
                onClick={() => handleView(r)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={eye} alt="eye" className="w-6 h-6 mx-auto" />
              </button>
            ),
            "Xóa": (
              <button
                onClick={() => handleDelete(r.id)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={DeleteIcon} alt="delete" className="w-6 h-6 mx-auto" />
              </button>
            ),
          }))}
        />

        {showPopup && (
          <AddTuyenDuong
            onClose={() => setShowPopup(false)}
            mode={mode}
            data={selected}
          />
        )}
      </div>
    </div>
  );
}

function Tram() {
  const [stations, setStations] = useState([
    { id: "TR001", route: "Tuyến 01", name: "Trạm Bến Thành", x: "10.123", y: "106.321" },
    { id: "TR002", route: "Tuyến 02", name: "Bến xe buýt Chợ Lớn", x: "10.234", y: "106.432" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowPopup(true);
  };
  const handleEdit = (item) => {
    setMode("edit");
    setSelected(item);
    setShowPopup(true);
  };
  const handleView = (item) => {
    setMode("view");
    setSelected(item);
    setShowPopup(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa trạm này?")) {
      setStations(stations.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton label="Thêm trạm" onClick={handleAdd} />
      </div>

      <div className="mt-10">
        <Table
          data={stations.map((s) => ({
            "Mã trạm": s.id,
            "Mã Tuyến Đường": s.route,
            "Tên trạm": s.name,
            "Tọa độ X": s.x,
            "Tọa độ Y": s.y,
            "Sửa": (
              <button
                onClick={() => handleEdit(s)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={edit} alt="edit" className="w-6 h-6 mx-auto" />
              </button>
            ),
            "Xem": (
              <button
                onClick={() => handleView(s)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={eye} alt="eye" className="w-6 h-6 mx-auto" />
              </button>
            ),
            "Xóa": (
              <button
                onClick={() => handleDelete(s.id)}
                className="hover:scale-110 transition-transform duration-150"
              >
                <img src={DeleteIcon} alt="delete" className="w-6 h-6 mx-auto" />
              </button>
            ),
          }))}
        />

        {showPopup && (
          <AddTram
            onClose={() => setShowPopup(false)}
            mode={mode}
            data={selected}
          />
        )}
      </div>
    </div>
  );
}