import React, { useState } from "react";

export default function AddAdminManageModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    maQTV: "",
    tenQTV: "",
    tenDangNhap: "",
    matKhau: "",
  });

  // ✅ Xử lý khi nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Xử lý khi bấm Thêm
  const handleSubmit = () => {
    if (!form.maQTV || !form.tenQTV || !form.tenDangNhap || !form.matKhau) {
      alert("Vui lòng nhập đầy đủ thông tin quản trị viên!");
      return;
    }

    onAdd(form);
    setForm({
      maQTV: "",
      tenQTV: "",
      tenDangNhap: "",
      matKhau: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[600px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thêm Quản Trị Viên
        </h2>

        {/* Form thêm quản trị viên */}
        <div className="flex flex-col gap-4">
          {/* Mã QTV */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã QTV</label>
            <input
              type="text"
              name="maQTV"
              value={form.maQTV}
              onChange={handleChange}
              placeholder="Nhập mã quản trị viên"
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>

          {/* Tên QTV */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Tên QTV</label>
            <input
              type="text"
              name="tenQTV"
              value={form.tenQTV}
              onChange={handleChange}
              placeholder="Nhập tên quản trị viên"
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
              placeholder="Nhập tên đăng nhập"
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
              placeholder="Nhập mật khẩu"
              className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-mainYellow text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
