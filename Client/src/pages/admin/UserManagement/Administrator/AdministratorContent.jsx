import { useState } from "react";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import AdministratorForm from "./AdministratorForm";

export default function AdministratorContent() {
  const [Administrator, setAdministrator] = useState([
    { maND: "ND000001", tenND: "Nguyễn Toàn Thắng", tenDangNhap: "admin1", matKhau: "123456"},
    { maND: "ND000002", tenND: "Nguyễn Toàn Thăng", tenDangNhap: "admin2", matKhau: "123456"},
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
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setAdministrator(routes.filter((obj) => obj.id !== id));
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton onClick={handleAdd} />
      </div>

      <div className="mt-10">
        <Table
          data={Administrator.map((obj) => ({
            "Mã người dùng": obj.maND,
            "Tên người dùng": obj.tenND,
            "Tên đăng nhập": obj.tenDangNhap,
            "Mật khẩu": obj.matKhau,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-6 h-6" onClick={() => handleEdit(obj)} />
                <img src={view} alt="view" className="w-6 h-6" onClick={() => handleView(obj)} />
                <img src={del} alt="delete" className="w-6 h-6" onClick={() => handleDelete(obj.maND)}/>
              </div>
            ),
          }))}
        />

        {showForm && (
          <AdministratorForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
        )}
      </div>
    </div>
  );
}
