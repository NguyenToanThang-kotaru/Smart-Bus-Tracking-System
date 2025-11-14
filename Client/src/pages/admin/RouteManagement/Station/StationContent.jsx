import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import StationForm from "./StationForm";
import { toast } from "react-toastify";

export default function StationContent() {
  const [stations, setStations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  useEffect(() => {
    loadTableDataStations();
  }, []);

  const loadTableDataStations = async () => {
    try {
      const res = await axiosClient.get("routes/tram"); 
      setStations(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lấy danh sách trạm!");
    }
  };

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (station) => {
    setMode("edit");
    setSelected(station);
    setShowForm(true);
  };

  const handleView = (station) => {
    setMode("view");
    setSelected(station);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa trạm này?")) {
      try {
        await axiosClient.delete(`routes/tram/${id}`);
        await loadTableDataStations();
        toast.success("Xóa trạm thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi xóa trạm!");
      }
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton label="Thêm trạm" onClick={handleAdd} />
      </div>

      <div className="mt-10">
        <Table
          data={stations.map((obj) => ({
            "Mã trạm": obj.MaTram,
            "Mã tuyến": obj.MaTuyenDuong,
            "Tên trạm": obj.TenTram,
            "Tọa độ X": obj.x || "",
            "Tọa độ Y": obj.y || "",
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
                  onClick={() => handleDelete(obj.MaTram)}
                />
              </div>
            ),
          }))}
        />

        {showForm && (
          <StationForm
            onClose={() => setShowForm(false)}
            mode={mode}
            data={selected}
            reload={loadTableDataStations}
          />
        )}
      </div>
    </div>
  );
}
