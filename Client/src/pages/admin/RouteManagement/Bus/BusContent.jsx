import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import BusForm from "./BusForm";
import { toast } from "react-toastify";

export default function BusContent() {
  const [bus, setBus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  useEffect(() => {
    loadTableDataBus();
  }, []);

  const loadTableDataBus = async () => {
    try {
      const res = await axiosClient.get("routes/xebuyt");
      setBus(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lấy danh sách xe buýt!");
    }
  };

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = async (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  const handleView = async (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };

  const handleDelete = async (soXeBuyt) => {
    if (window.confirm("Bạn có chắc muốn xóa xe buýt này?")) {
      try {
        await axiosClient.delete(`routes/xebuyt/${soXeBuyt}`);
        await loadTableDataBus();
        toast.success("Xóa xe buýt thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi xóa xe buýt!");
      }
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-x-10">
        <SearchBar />
        <AddButton onClick={handleAdd} />
      </div>

      <div className="mt-10">
        <Table
          data={bus.map((obj) => ({
            "Số xe buýt": obj.SoXeBuyt,
            "Biển số": obj.BienSoXe,
            "Sức chứa": obj.SucChua,
            "Trạng thái xe": obj.TrangThaiXe,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-4 h-4 cursor-pointer" onClick={() => handleEdit(obj)}/>
                <img src={view} alt="view" className="w-4 h-4 cursor-pointer" onClick={() => handleView(obj)}/>
                <img src={del} alt="delete" className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(obj.SoXeBuyt)}/>
              </div>
            ),
          }))}
        />

        {showForm && (
          <BusForm onClose={() => setShowForm(false)} mode={mode} data={selected}reload={loadTableDataBus}/>
        )}
      </div>
    </div>
  );
}
