import { useState } from "react";

export default function AddBusManageModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    maNguoiDung: "",
    tenNguoiDung: "",
    tenDangNhap: "",
    matKhau: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[600px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thêm Người Quản Lý Xe Buýt
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Mã người dùng */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã người dùng</label>
            <input
              type="text"
              name="maNguoiDung"
              value={form.maNguoiDung}
              onChange={handleChange}
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Tên người dùng */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Tên người dùng</label>
            <input
              type="text"
              name="tenNguoiDung"
              value={form.tenNguoiDung}
              onChange={handleChange}
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Tên đăng nhập */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Tên đăng nhập</label>
            <input
              type="text"
              name="tenDangNhap"
              value={form.tenDangNhap}
              onChange={handleChange}
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={form.matKhau}
              onChange={handleChange}
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>
        </form>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-mainYellow text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
