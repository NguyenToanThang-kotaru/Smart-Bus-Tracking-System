import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import DriverForm from "./DriverForm"; 
import { toast } from "react-toastify";

export default function DriverContent() {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const loadTableDataDriver = async () => {
    try {
      const res = await axiosClient.get("users/admin/driver");
      setDrivers(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách tài xế!");
    }
  };

  useEffect(() => {
    loadTableDataDriver();
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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài xế này?")) {
      try {
        await axiosClient.delete(`users/admin/driver/${id}`);
        await loadTableDataDriver();
        toast.success("Xóa tài xế thành công!");
      } catch (err) {
        toast.error("Lỗi xoá tài xế!");
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
          data={drivers.map((obj) => ({
            
            "Mã tài xế": obj.MaTX,
            "Số CCCD": obj.SoCccd,
            "Số điện thoại": obj.SdtTX,
            "Bậc bằng lái": obj.BacBangLai,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" onClick={() => handleEdit(obj)} />
                <img src={view} alt="view" className="w-4 h-4 cursor-pointer" onClick={() => handleView(obj)} />
                <img src={del} alt="delete" className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(obj.MaTX)} />
              </div>
            ),
          }))}
        />

        {showForm && (
          <DriverForm onClose={() => setShowForm(false)} mode={mode} data={selected} reload={loadTableDataDriver}/>
        )}
      </div>
    </div>
  );
}
