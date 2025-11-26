import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Table from "@/Components/tableComponent";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import AssignmentForm from "./AssignmentForm";

export default function AssignmentContent() {
  const [assignments, setAssignments] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [busList, setBusList] = useState([]);
  const [routeList, setRouteList] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  const loadDriver = async () => {
    try {
      const res = await axiosClient.get("users/admin/driver");
      setDriverList(res.data || []);
    } catch (err) {}
  };

  const loadBus = async () => {
    try {
      const res = await axiosClient.get("routes/xebuyt");
      setBusList(res.data || []);
    } catch (err) {}
  };

  const loadRoute = async () => {
    try {
      const res = await axiosClient.get("routes/tuyenduong");
      setRouteList(res.data || []);
    } catch (err) {}
  };

  const loadTableDataAssignment = async () => {
    try {
      const res = await axiosClient.get("schedule/assignment");
      setAssignments(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách phân công!");
      console.error(err);
    }
  };

  useEffect(() => {
    loadDriver();
    loadBus();
    loadRoute();
    loadTableDataAssignment();
  }, []);

  const getDriverLabel = (id) => {
    const d = driverList.find((x) => x.MaTX === id);
    return d ? `${d.MaTX} - ${d.TenND ?? ""}` : id;
  };

  const getBusLabel = (id) => {
    const b = busList.find((x) => x.SoXeBuyt === id);
    return b ? `${b.SoXeBuyt} - ${b.BienSoXe ?? ""}` : id;
  };

  const getRouteLabel = (id) => {
    const r = routeList.find((x) => x.MaTD === id);
    return r ? `${r.MaTD} - ${r.TenTD ?? ""}` : id;
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

  const handleDelete = async (MaPC) => {
    if (!window.confirm("Bạn có chắc muốn xóa phân công này?")) return;
    try {
      await axiosClient.put(`schedule/assignment/delete/${MaPC}`);
      await loadTableDataAssignment();
      toast.success("Xóa phân công thành công!");
    } catch (err) {
      toast.error("Lỗi xoá phân công!");
      console.error(err);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword || keyword.trim() === "") {
      loadTableDataAssignment();
      return;
    }
    try {
      const res = await axiosClient.get(
        `schedule/assignment/search?keyword=${encodeURIComponent(keyword)}`
      );
      setAssignments(res.data);
    } catch (err) {
      toast.error("Lỗi tìm kiếm phân công!");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar onSearch={handleSearch} />
        <AddButton onClick={handleAdd} />
      </div>
      
      <div className="mt-10">
        <Table
          data={assignments.map((obj) => ({
            "Mã phân công": obj.MaPC,
            "Tài xế": getDriverLabel(obj.MaTX),
            "Xe Buýt": getBusLabel(obj.SoXeBuyt),
            "Tuyến đường": getRouteLabel(obj.MaTD),
            "Hành động": (
              <div className="flex gap-[30px]">
                <img
                  src={edit}
                  alt="edit"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleEdit(obj)}
                />
                <img
                  src={view}
                  alt="view"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleView(obj)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleDelete(obj.MaPC)}
                />
              </div>
            ),
          }))}
        />
        {showForm && (
          <AssignmentForm
            onClose={() => setShowForm(false)}
            mode={mode}
            data={selected}
            reload={loadTableDataAssignment}
          />
        )}
      </div>
    </div>
  );
}