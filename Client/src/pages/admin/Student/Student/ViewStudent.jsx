import { useEffect, useState } from "react";

export default function ViewHocSinhModal({ open, onClose, hocSinh }) {
  const [form, setForm] = useState({
    MaHocSinh: "",
    TenHocSinh: "",
    Lop: "",
    Tram: "",
    MaPhuHuynh: "",
    TenPhuHuynh: "",
  });

  // ✅ Khi modal mở và có dữ liệu, cập nhật form
  useEffect(() => {
    if (hocSinh) {
      console.log("📦 Dữ liệu học sinh nhận được:", hocSinh);
      setForm({
        MaHocSinh: hocSinh.MaHocSinh || "",
        TenHocSinh: hocSinh.TenHocSinh || "",
        Lop: hocSinh.Lop || "",
        Tram: hocSinh.Tram || "",
        MaPhuHuynh: hocSinh.maPhuHuynh || "",
        TenPhuHuynh: hocSinh.tenPhuHuynh || "",
      });
    }
  }, [hocSinh]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Xem thông tin học sinh
        </h2>

        {/* Form hiển thị thông tin */}
        <form className="flex justify-between gap-8">
          {/* Cột trái */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã học sinh</label>
              <input
                type="text"
                value={form.MaHocSinh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên học sinh</label>
              <input
                type="text"
                value={form.TenHocSinh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Lớp</label>
              <input
                type="text"
                value={form.Lop}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Trạm</label>
              <input
                type="text"
                value={form.Tram}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã phụ huynh</label>
              <input
                type="text"
                value={form.MaPhuHuynh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên phụ huynh</label>
              <input
                type="text"
                value={form.TenPhuHuynh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </form>

        {/* Nút đóng */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
