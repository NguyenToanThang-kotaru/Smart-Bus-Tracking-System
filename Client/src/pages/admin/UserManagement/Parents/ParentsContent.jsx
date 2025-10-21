import { useState } from "react";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import ParentsForm from "./ParentsForm";

export default function ParentsContent() {
  const [Parents, setParents] = useState([
    { maPH: "ND000007", tenPH: "Lê Văn Nhất", tenDangNhap: "phuhuynh01", matKhau: "123456", sdt: "0123456789"},
    { maPH: "ND000008", tenPH: "Nguyễn Phát Tín", tenDangNhap: "phuhuynh02", matKhau: "123456", sdt: "0123456789"},
    { maPH: "ND000009", tenPH: "Hồ Minh Tiến", tenDangNhap: "phuhuynh03", matKhau: "123456", sdt: "0123456789"},
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
      setParents(routes.filter((obj) => obj.id !== id));
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton onClick={handleAdd} />
      </div>

      <div className="mt-10 ">
        <Table
          data={Parents.map((obj) => ({
            "Mã phụ huynh": obj.maPH,
            "Tên phụ huynh": obj.tenPH,
            "Tên đăng nhập": obj.tenDangNhap,
            "Mật khẩu": obj.matKhau,
            "Số điện thoại": obj.sdt,
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
          <ParentsForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
        )}
      </div>
    </div>
  );
}
