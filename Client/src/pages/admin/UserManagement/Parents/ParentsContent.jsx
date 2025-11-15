import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import ParentsForm from "./ParentsForm";
import { toast } from "react-toastify";

export default function ParentsContent() {
  const [parents, setParents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const loadParentsData = async () => {
    try {
      const res = await axiosClient.get("users/admin/parents"); 
      setParents(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách phụ huynh!");
    }
  };

  useEffect(() => {
    loadParentsData();
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

  const handleDelete = async (TenDangNhap) => {
    if (window.confirm("Bạn có chắc muốn xóa phụ huynh này?")) {
      try {
        await axiosClient.put(`users/phuhuynh/delete/${TenDangNhap}`);
        await loadParentsData();
        toast.success("Xóa phụ huynh thành công!");
      } catch (err) {
        console.error("Lỗi lấy danh sách phụ huynh:", err);
        toast.error("Lỗi xoá phụ huynh!");
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
          data={parents.map((obj) => ({
            "Tên đăng nhập": obj.TenDangNhap,
            "Tên phụ huynh": obj.TenPH,
            "Số điện thoại": obj.SdtPH,
            "Mật khẩu": obj.MatKhau, 
            
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" onClick={() => handleEdit(obj)}/>
                <img src={view} alt="view" className="w-4 h-4 cursor-pointer" onClick={() => handleView(obj)}/>
                <img src={del} alt="delete" className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(obj.TenDangNhap)}/>
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

