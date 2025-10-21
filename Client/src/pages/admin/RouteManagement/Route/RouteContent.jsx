import { useState } from "react";
import TableComponent from "@/Components/tableComponent";
import SearchBarComponent from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import RouteForm from "./RouteForm";

export default function RouteContent() {
  const [routes, setRoutes] = useState([
    { id: "TD001", name: "Tuyến số 1: Bến Thành - Bến xe buýt Chợ Lớn"},
    { id: "TD002", name: "Tuyến số 2: Bến xe buýt Chợ Lớn - Chợ Tân Nhựt"},
    { id: "TD003", name: "Tuyến số 3: Đại học Quốc Gia - Bến xe Miền Tây"},
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
    if (window.confirm("Bạn có chắc muốn xóa tuyến đường này?")) {
      setRoutes(routes.filter((obj) => obj.id !== id));
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBarComponent />
        <AddButton onClick={handleAdd} />
      </div>

      <div className="mt-10">
        <TableComponent
          data={routes.map((obj) => ({
            "Mã tuyến": obj.id,
            "Tên tuyến": obj.name,
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
          <RouteForm onClose={() => setShowForm(false)} mode={mode} data={selected}/>
        )}
      </div>
    </div>
  );
}