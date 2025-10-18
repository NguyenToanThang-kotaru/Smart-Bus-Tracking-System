import React, { useEffect, useState } from "react";

export default function ViewAdminManageModal({ open, onClose, adminManage }) {
  const [form, setForm] = useState({
    maQTV: "",
    tenQTV: "",
    tenDangNhap: "",
    matKhau: "",
  });

  
  useEffect(() => {
    if (adminManage) {
      console.log("📦 Dữ liệu adminManage nhận được:", adminManage);
      setForm({
        maQTV: adminManage.maQTV || "",
        tenQTV: adminManage.tenQTV || "",
        tenDangNhap: adminManage.tenDangNhap || "",
        matKhau: adminManage.matKhau || "",
      });
    }
  }, [adminManage]);

  if (!open || !adminManage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[600px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thông Tin Quản Trị Viên
        </h2>

        {/* Form hiển thị thông tin */}
        <div className="flex flex-col gap-4">
          {/* Mã QTV */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã QTV</label>
            <input
              type="text"
              readOnly
              value={form.maQTV}
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Tên QTV */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Tên QTV</label>
            <input
              type="text"
              readOnly
              value={form.tenQTV}
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Tên đăng nhập */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Tên đăng nhập</label>
            <input
              type="text"
              readOnly
              value={form.tenDangNhap}
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mật khẩu</label>
            <input
              type="text"
              readOnly
              value={form.matKhau}
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-end mt-6">
          <button
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
