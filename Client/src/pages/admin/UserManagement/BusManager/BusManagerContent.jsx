import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import BusManagerForm from "./BusManagerForm";
import { toast } from "react-toastify";

export default function BusManagerContent() {
  const [busManager, setBusManager] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");
  
  const loadTableDataBusManager = async () => {
    try {
      const res = await axiosClient.get("users/admin/busManager");
      setBusManager(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách quản lý xe buýt!");
    }
  };

  useEffect(() => {
    loadTableDataBusManager();
  }, []);

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
      setBusManager(routes.filter((obj) => obj.id !== id));
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
          data={busManager.map((obj) => ({
            "Mã người dùng": obj.MaND,
            "Tên người dùng": obj.TenND,
            "Tên đăng nhập": obj.TenDangNhap,
            "Mật khẩu": obj.MatKhau,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4" onClick={() => handleEdit(obj)} />
                <img src={view} alt="view" className="w-4 h-4" onClick={() => handleView(obj)} />
                <img src={del} alt="delete" className="w-4 h-4" onClick={() => handleDelete(obj.maND)}/>
              </div>
            ),
          }))}
        />

        {showForm && (
          <BusManagerForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
        )}
      </div>
    </div>
  );
}
