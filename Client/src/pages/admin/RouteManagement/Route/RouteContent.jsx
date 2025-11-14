import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import RouteForm from "./RouteForm";
import { toast } from "react-toastify";

export default function RouteContent() {
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  useEffect(() => {
    loadTableDataRoutes();
  }, []);

  const loadTableDataRoutes = async () => {
    try {
      const res = await axiosClient.get("routes/tuyenduong");
      setRoutes(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lấy danh sách tuyến đường!");
    }
  };

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

  const handleDelete = async (MaTD) => {
    if (window.confirm("Bạn có chắc muốn xóa tuyến đường này?")) {
      try {
        await axiosClient.delete(`routes/tuyenduong/${MaTD}`);
        await loadTableDataRoutes();
        toast.success("Xóa tuyến đường thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi xóa tuyến đường!");
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
          data={routes.map((obj) => ({
            "Mã tuyến": obj.MaTD,
            "Tên tuyến": obj.TenTD,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEdit(obj)}
                />
                <img
                  src={view}
                  alt="view"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleView(obj)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(obj.MaTD)}
                />
              </div>
            ),
          }))}
        />

        {showForm && (
          <RouteForm
            onClose={() => setShowForm(false)}
            mode={mode}
            data={selected}
            reload={loadTableDataRoutes}
          />
        )}
      </div>
    </div>
  );
}
