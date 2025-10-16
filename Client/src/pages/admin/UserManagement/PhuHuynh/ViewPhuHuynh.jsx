import { useEffect, useState } from "react";

export default function ViewPhuHuynhModal({ open, onClose, phuHuynh }) {
  const [form, setForm] = useState({
    maPhuHuynh: "",
    tenPhuHuynh: "",
    soDienThoai: "",
    tenDangNhap: "",
    matKhau: "",
    hocSinh: "",
  });

  // ✅ Khi modal mở và có dữ liệu, cập nhật form
  useEffect(() => {
    if (phuHuynh) {
      setForm({
        maPhuHuynh: phuHuynh.MaPhuHuynh || "",
        tenPhuHuynh: phuHuynh.name || "",
        soDienThoai: phuHuynh.SoDT || "",
        tenDangNhap: phuHuynh.tenDangNhap || "",
        matKhau: phuHuynh.matKhau || "",
        hocSinh: phuHuynh.hocSinh || "",
      });
    }
  }, [phuHuynh]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Xem thông tin phụ huynh
        </h2>

        {/* Form hiển thị thông tin */}
        <form className="flex justify-between gap-8">
          {/* Cột trái */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã phụ huynh</label>
              <input
                type="text"
                name="maPhuHuynh"
                value={form.maPhuHuynh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Số điện thoại</label>
              <input
                type="text"
                name="soDienThoai"
                value={form.soDienThoai}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên đăng nhập</label>
              <input
                type="text"
                name="tenDangNhap"
                value={form.tenDangNhap}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mật khẩu</label>
              <input
                type="password"
                name="matKhau"
                value={form.matKhau}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên phụ huynh</label>
              <input
                type="text"
                name="tenPhuHuynh"
                value={form.tenPhuHuynh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Học sinh</label>
              <textarea
                name="hocSinh"
                value={form.hocSinh}
                readOnly
                placeholder="Danh sách học sinh"
                className="border border-gray-300 rounded-xl p-2 px-4 h-24 resize-none bg-gray-100 cursor-not-allowed"
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
