import { useState } from "react";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import StationForm from "./StationForm";

export default function StationContent() {
  const [stations, setStations] = useState([
    { id: "TRAM000001", route: "Tuyến 01", name: "Trạm Bến Thành", x: "10.123", y: "106.321" },
    { id: "TRAM000002", route: "Tuyến 02", name: "Bến xe buýt Chợ Lớn", x: "10.234", y: "106.432" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };
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
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa trạm này?")) {
      setStations(stations.filter((obj) => obj.id !== id));
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
          data={stations.map((obj) => ({
            "Mã trạm": obj.id,
            "Mã Tuyến Đường": obj.route,
            "Tên trạm": obj.name,
            "Tọa độ X": obj.x,
            "Tọa độ Y": obj.y,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-6 h-6" onClick={() => handleEdit(obj)}/>
                <img src={view} alt="view" className="w-6 h-6" onClick={() => handleView(obj)}/>
                <img src={del} alt="del" className="w-6 h-6" onClick={() => handleDelete(obj.id)}/>
              </div>
            ),
          }))}
        />

        {showForm && (
          <StationForm onClose={() => setShowForm(false)} mode={mode} data={selected}/>
        )}
      </div>
    </div>
  );
}
