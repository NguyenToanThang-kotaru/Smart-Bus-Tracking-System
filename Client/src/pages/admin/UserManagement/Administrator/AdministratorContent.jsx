import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import AdministratorForm from "./AdministratorForm";
import { toast } from "react-toastify";

export default function AdminManagerContent() {
  const [administrator, setAdministrator] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const loadTableDataAdminisitrator = async () => {
    try {
      const res = await axiosClient.get("users/admin/administrator");
      setAdministrator(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách quản trị viên!");
    }
  };

  useEffect(() => {
    loadTableDataAdminisitrator();
  }, []);


  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  const handleView = (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };

  const handleDelete = async (MaND) => {
    if (window.confirm("Bạn có chắc muốn xóa quản trị viên này?")) {
      try {
        await axiosClient.put(`users/admin/delete/${MaND}`);//////////////////
        await loadTableDataAdminisitrator();
        toast.success("Xóa quản trị viên thành công!");
      } catch (err) {
        toast.error("Lỗi xoá quản trị viên!");
      }
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
          data={administrator.map((obj) => ({
            "Mã người dùng": obj.MaND,
            "Tên người dùng": obj.TenND,
            "Tên đăng nhập": obj.TenDangNhap,
            "Mật khẩu": obj.MatKhau,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" onClick={() => handleEdit(obj)}/>
                <img src={view} alt="view" className="w-4 h-4 cursor-pointer" onClick={() => handleView(obj)}/>
                <img src={del} alt="delete" className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(obj.MaND)}/>
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
