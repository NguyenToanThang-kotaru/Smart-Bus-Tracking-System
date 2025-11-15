import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";

export default function StationForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Trạm" : isView ? "Xem Trạm" : "Thêm Trạm";

  // State
  const [MaTram, setMaTram] = useState(data?.MaTram || "");
  const [MaTuyenDuong, setMaTuyenDuong] = useState(data?.MaTuyenDuong || "");
  const [TenTram, setTenTram] = useState(data?.TenTram || "");
  const [x, setX] = useState(data?.x || "");
  const [y, setY] = useState(data?.y || "");

  // Khi thêm mới => gọi API lấy mã trạm tiếp theo
  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("routes/tram/nextID");
          setMaTram(res.data.newCode || "");
        } catch (err) {
          console.error(err);
          toast.error("Lỗi khi lấy mã trạm tiếp theo!");
        }
      }
    };
    getNextId();
  }, [mode]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { MaTram, MaTuyenDuong, TenTram, x, y };
      if (mode === "add") {
        await axiosClient.post("routes/tram", payload);
        toast.success("Thêm trạm thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`routes/tram/${MaTram}`, payload);
        toast.success("Cập nhật trạm thành công!");
      }
      if (reload) await reload();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lưu dữ liệu trạm!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-[600px] gap-y-[20px]"
      >
        <h2 className="text-3xl font-bold text-mainBlue">{title}</h2>

        <div className="flex flex-col gap-4">
          {/* Mã trạm */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã trạm</label>
            <input
              type="text"
              value={MaTram}
              readOnly
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100 h-[35px]"
            />
          </div>

          {/* Thuộc tuyến */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Thuộc tuyến</label>
            <input
              type="text"
              value={MaTuyenDuong}
              readOnly
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100 h-[35px]"
            />
          </div>

          {/* Tên trạm */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên trạm</label>
            <input
              type="text"
              value={TenTram}
              onChange={(e) => setTenTram(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          {/* Tọa độ */}
          <div className="grid grid-cols-2 gap-[50px]">
            <div className="flex flex-col gap-y-2">
              <label className="text-xl text-mainBlue font-bold">Tọa độ X</label>
              <input
                type="text"
                value={x}
                onChange={(e) => setX(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-xl text-mainBlue font-bold">Tọa độ Y</label>
              <input
                type="text"
                value={y}
                onChange={(e) => setY(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              type="submit"
              className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              XÁC NHẬN
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}
