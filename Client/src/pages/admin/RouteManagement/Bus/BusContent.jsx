import { useState } from "react";
import TableComponent from "@/Components/tableComponent";
import SearchBarComponent from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import BusForm from "./BusForm";

export default function BusContent() {
  const [bus, setBus] = useState([
    { soXeBuyt: "Bus01", bienSoXe: "XX-XXXXXXX", sucChua: "30", trangThaiXe: "Tốt" },
    { soXeBuyt: "Bus02", bienSoXe: "XX-XXXXXXX", sucChua: "30", trangThaiXe: "Tốt" },
    { soXeBuyt: "Bus03", bienSoXe: "XX-XXXXXXX", sucChua: "30", trangThaiXe: "Tốt" },
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
    if (window.confirm("Bạn có chắc muốn xóa xe buýt này?")) {
      setBus(bus.filter((obj) => obj.id !== id));
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
          data={bus.map((obj) => ({
            "Số xe buýt": obj.soXeBuyt,
            "Biển số": obj.bienSoXe,
            "Sức chứa": obj.sucChua,
            "Trạng thái xe": obj.trangThaiXe,
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
          <BusForm onClose={() => setShowForm(false)} mode={mode} data={selected}/>
        )}
      </div>
    </div>
  );
}