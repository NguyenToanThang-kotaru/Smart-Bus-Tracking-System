import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";

export default function BusForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Xe Buýt" : mode === "view" ? "Xem Xe Buýt" : "Thêm Xe Buýt";

  // State của form
  const [SoXeBuyt, setSoXeBuyt] = useState(data?.SoXeBuyt || "");
  const [BienSoXe, setBienSoXe] = useState(data?.BienSoXe || "");
  const [SucChua, setSucChua] = useState(data?.SucChua || "");
  const [TrangThaiXe, setTrangThaiXe] = useState(data?.TrangThaiXe || "");

  // Khi thêm mới => gọi API lấy mã xe buýt tiếp theo
  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("routes/xebuyt/nextID");
          setSoXeBuyt(res.data.newCode || "");
        } catch (err) {
          console.error(err);
          toast.error("Lỗi khi lấy mã xe buýt tiếp theo!");
        }
      }
    };
    getNextId();
  }, [mode]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axiosClient.post("routes/xebuyt", {
          SoXeBuyt,
          BienSoXe,
          SucChua,
          TrangThaiXe,
        });
        toast.success("Thêm xe buýt thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`routes/xebuyt/${SoXeBuyt}`, {
          BienSoXe,
          SucChua,
          TrangThaiXe,
        });
        toast.success("Cập nhật xe buýt thành công!");
      }
      if (reload) await reload();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lưu dữ liệu xe buýt!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-[600px] gap-y-[35px]"
      >
        <h2 className="text-4xl font-bold text-mainBlue">{title}</h2>

        <div className="flex flex-col gap-4">
          {/* Số xe buýt */}
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Số xe buýt</label>
            <input
              type="text"
              value={SoXeBuyt}
              onChange={(e) => setSoXeBuyt(e.target.value)}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          {/* Biển số xe */}
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Biển số xe</label>
            <input
              type="text"
              value={BienSoXe}
              onChange={(e) => setBienSoXe(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          {/* Sức chứa */}
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Sức chứa</label>
            <select
              value={SucChua}
              onChange={(e) => setSucChua(e.target.value)}
              disabled={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            >
              <option value="">-- Chọn sức chứa --</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
            </select>
          </div>

          {/* Trạng thái xe */}
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Trạng thái xe</label>
            <select
              value={TrangThaiXe}
              onChange={(e) => setTrangThaiXe(e.target.value)}
              disabled={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              type="submit"
              className="text-xl bg-mainYellow w-[170px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              XÁC NHẬN
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xl bg-mainBlue w-[170px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}
