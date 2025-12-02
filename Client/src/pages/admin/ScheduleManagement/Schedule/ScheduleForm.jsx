import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import view from "@/assets/Icon/viewYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import del from "@/assets/Icon/deleteYellow.png";

export default function ScheduleForm({ onClose, mode, data, reload }) {
  const [scheduleId, setscheduleId] = useState("");
  const [currentMode, setCurrentMode] = useState(mode);
  const [drivers, setDrivers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripList, setTripList] = useState(data?.trips || []);

  const isList = currentMode === "list";
  const isView = currentMode === "view";
  const isEdit = currentMode === "edit";
  const isAdd = currentMode === "add";

  const title =
    isEdit ? "Sửa Lịch Trình" : isView ? "Xem Lịch Trình" : isAdd ? "Thêm Lịch Trình" : "Danh Sách Chuyến";

  const handleAdd = async () => {
    const payload = {
      MaLT: scheduleId,
      MaTX: document.getElementById("form_tx").value,
      NgayHanhTrinh: data?.date || "",
      CaHanhTrinh: data?.shift || "",
      TrangThai: 0,
    };

    try {
      await axiosClient.post("schedule", payload);
      if (typeof reload === "function") reload();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Thêm lịch trình thất bại!");
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedTrip?.raw?.MaLT) return;

    const updated = {
      MaTX: document.getElementById("form_tx").value,
      NgayHanhTrinh: selectedTrip.raw?.NgayHanhTrinh,
      CaHanhTrinh: selectedTrip.raw?.CaHanhTrinh,
      TrangThai: selectedTrip.raw?.TrangThai,
    };

    try {
      await axiosClient.put(`/schedule/update/${selectedTrip.raw.MaLT}`, updated);
      if (typeof reload === "function") reload();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (trip) => {
    setSelectedTrip(trip);
    setCurrentMode("view");
  };

  const handleEditClick = (trip) => {
    setSelectedTrip(trip);
    setCurrentMode("edit");
  };

  const handleDelete = async (trip) => {
    if (!trip?.raw?.MaLT) return;
    if (!window.confirm(`Bạn chắc chắn muốn xóa lịch trình ${trip.raw.MaLT}?`)) return;
    try {
      await axiosClient.put(`/schedule/delete/${trip.raw.MaLT}`);
      if (typeof reload === "function") reload();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBackToList = () => {
    setSelectedTrip(null);
    setCurrentMode("list");
  };

  const loadNextId = async () => {
    try {
      const res = await axiosClient.get("schedule/nextid");
      setscheduleId(res.data?.nextId || "");
    } catch (err) {
      console.error("Lỗi lấy mã lịch trình tiếp theo:", err);
    }
  };

  const loadDrivers = async () => {
    try {
      const res = await axiosClient.get("users/admin/driver");

      const arr =
        Array.isArray(res.data)
          ? res.data
          : res.data?.data ??
            [];

      setDrivers(arr);
    } catch (err) {
      console.error("Lỗi load tài xế:", err);
      setDrivers([]);
    }
  };

  useEffect(() => {
    if (currentMode === "add") {
      loadNextId();
      loadDrivers();
    }
  }, [currentMode]);

  useEffect(() => {
    if (currentMode === "edit") {
      loadDrivers();
    }
  }, [currentMode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-3/7">
        {/* --- Danh sách chuyến --- */}
        {isList && (
          <div className="flex-1 overflow-y-auto space-y-2 ">
            <div className="text-center text-xl font-bold text-gray-700 mb-4">
              DANH SÁCH CHUYẾN {data?.shift} NGÀY {data?.date}
            </div>

            {tripList.map((trip, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-gray-200 rounded-[15px] p-4 shadow-sm bg-gray-50 hover:bg-white transition"
              >
                <div className="flex flex-col text-gray-700">
                  <span className="font-semibold text-base">{trip.driver}</span>
                  <span className="text-sm text-gray-500">{trip.bus}</span>
                  <span className="text-sm text-gray-500">LT: {trip.raw?.MaLT}</span>
                </div>

                <div className="flex gap-4 items-center">
                  <img src={view} className="w-5 cursor-pointer" onClick={() => handleView(trip)} />
                  <img src={edit} className="w-5 cursor-pointer" onClick={() => handleEditClick(trip)} />
                  <img src={del} className="w-5 cursor-pointer" onClick={() => handleDelete(trip)} />
                </div>
              </div>
            ))}

            {tripList.length === 0 && (
              <p className="text-center italic text-gray-400">Không có chuyến nào</p>
            )}
          </div>
        )}

        {/* --- Chế độ xem chi tiết --- */}
        {isView && selectedTrip && (
          <div className="flex flex-col text-gray-700 gap-3 max-h-[60vh] overflow-y-auto">
            <div className="text-center text-xl font-bold text-gray-700 mb-4"> CHI TIẾT CHUYẾN </div>
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <p><strong>Mã LT:</strong> {selectedTrip.raw?.MaLT}</p>
              <p><strong>Tài xế:</strong> {selectedTrip.driver}</p>
              <p><strong>Xe buýt:</strong> {selectedTrip.bus}</p>
              <p><strong>Tuyến:</strong> {selectedTrip.route}</p>
            </div>
          </div>
        )}

        {/* --- add or edit  --- */}
        {(isAdd || (isEdit && selectedTrip)) && (
          <form className="bg-white flex flex-col rounded-[50px] gap-y-[20px]">
            <h2 className="text-3xl font-bold text-mainBlue mb-3">
              {isAdd ? "Thêm Lịch Trình" : "Sửa Lịch Trình"}
            </h2>
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Mã lịch trình</label>
                <input type="text" value={isAdd ? scheduleId : selectedTrip.raw?.MaLT} 
                    disabled
                    className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px]"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Mã tài xế</label>
                <select id="form_tx"
                    className="border-2 border-gray-300 rounded-[10px] px-3 w-full h-[35px]"
                    defaultValue={isEdit ? selectedTrip.raw?.MaTX : ""}
                >
                    <option value="">Chọn tài xế</option>
                    {drivers.map((d) => (
                    <option key={d.MaTX} value={d.MaTX}>
                        {d.MaTX} {d.TenTX}
                    </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Ngày hành trình</label>
                <input type="text"
                    value={
                    isAdd
                        ? data?.date || ""
                        : selectedTrip.raw?.NgayHanhTrinh || ""
                    }
                    disabled
                    className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px]"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Ca hành trình</label>
                <input type="text"
                    value={
                    isAdd
                        ? data?.shift || ""
                        : selectedTrip.raw?.CaHanhTrinh || ""
                    }
                    disabled
                    className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px]"
                />
              </div>
            <div className="flex justify-end mt-6 gap-4">
              <button type="button"
                onClick={handleBackToList}
                className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
              >
                HỦY
              </button>

              <button type="button"
                onClick={isAdd ? handleAdd : handleSaveEdit}
                className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
              >
                XÁC NHẬN
              </button>
            </div>
          </form>
        )}

        {/* --- Nút điều hướng dưới cùng --- */}
        <div className="flex justify-end mt-6 gap-4">
          {isView && (
            <button
              onClick={handleBackToList}
              className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
            >
              TRỞ LẠI
            </button>
          )}

          {isList && (
            <>
              <button
                onClick={() => {
                  loadNextId();
                  loadDrivers();
                  setCurrentMode("add");
                }}
                className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
              >
                THÊM
              </button>

              <button
                onClick={onClose}
                className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
              >
                ĐÓNG
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}