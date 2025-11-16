import { useState } from "react";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import AssignmentForm from "./AssignmentForm";

export default function AssignmentContent() {
  const [assignment, setAssignment] = useState([
    { MaPC: "PC000001", MaTX: "Nguyễn Văn A", MaXe: "Xe1", MaTD: "Tuyến 01"},
    { MaPC: "PC000002", MaTX: "Nguyễn Văn A", MaXe: "Xe2", MaTD: "Tuyến 02"},
    { MaPC: "PC000003", MaTX: "Nguyễn Văn A", MaXe: "Xe3", MaTD: "Tuyến 03"},
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
  const handleDelete = (MaPC) => {
    if (window.confirm("Bạn có chắc muốn xóa phân công này?")) {
      setAssignment(routes.filter((obj) => obj.MaPC !== MaPC));
    }
  };
  
  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar/>
        <AddButton onClick={handleAdd} />
      </div>
                
      <div className="mt-10">
        <Table
          data={assignment.map((obj) => ({
            "Mã phân công": obj.MaPC,
            "Tài xế": obj.MaTX,
            "Xe Buýt": obj.MaXe,
            "Tuyến đường": obj.MaTD,
            "Hành động": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4" onClick={() => handleEdit(obj)}/>
                <img src={view} alt="view" className="w-4 h-4" onClick={() => handleView(obj)}/>
                <img src={del} alt="del" className="w-4 h-4" onClick={() => handleDelete(obj.MaPC)}/>
              </div>
            ),          
          }))}  
        />

        {showForm && (
          <AssignmentForm onClose={() => setShowForm(false)} mode={mode} data={selected}/>
        )}
      </div>
    </div>
  );
}