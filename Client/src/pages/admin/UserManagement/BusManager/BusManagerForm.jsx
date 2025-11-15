import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";

export default function BusManagerForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Quản Lý" : mode === "view" ? "Xem Quản Lý" : "Thêm Quản Lý";

  const [MaND, setMaND] = useState(data?.MaND || "");
  const [TenND, setTenND] = useState(data?.TenND || "");
  const [TenDangNhap, setTenDangNhap] = useState(data?.TenDangNhap || "");
  const [MatKhau, setMatKhau] = useState(data?.MatKhau || "");

  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get(""); //getNextUserId
          setMaND(res.data.nextId);
        } catch (err) {
          toast.error("Lỗi khi lấy mã người dùng tiếp theo!");
        }
      }
    };
    getNextId();
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axiosClient.post("users/admin/busManager", { MaND, MaVT: 'VT000002', TenND, TenDangNhap, MatKhau});
        toast.success("Thêm quản lý xe buýt thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`users/admin/busManager/${MaND}`, { TenND, TenDangNhap, MatKhau });
        toast.success("Sửa thông tin quản lý xe buýt thành công!");
      }
      if (reload) await reload();
      onClose();
    } catch (err) {
      toast.error("Lỗi xử lý dữ liệu quản lý xe buýt!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-2/7 gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã người dùng</label>
            <input type="text" value={MaND} onChange={e => setMaND(e.target.value)}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên người dùng</label>
            <input type="text" value={TenND} onChange={e => setTenND(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên đăng nhập</label>
            <input type="text" value={TenDangNhap} onChange={e => setTenDangNhap(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mật khẩu</label>
            <input type="text" value={MatKhau} onChange={e => setMatKhau(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button type="submit" className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
              XÁC NHẬN
            </button>
          )}
          <button onClick={onClose} className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900">
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}