import React, { useEffect, useState } from "react";

export default function EditAdminManageModal({ open, onClose, adminManage, onSave }) {
  const [form, setForm] = useState({
    maQTV: "",
    tenQTV: "",
    tenDangNhap: "",
    matKhau: "",
  });

  // 
  useEffect(() => {
    if (adminManage) {
      console.log("🛠️ Dữ liệu adminManage cần sửa:", adminManage);
      setForm({
        maQTV: adminManage.maQTV || "",
        tenQTV: adminManage.tenQTV || "",
        tenDangNhap: adminManage.tenDangNhap || "",
        matKhau: adminManage.matKhau || "",
      });
    }
  }, [adminManage]);

  if (!open || !adminManage) return null;

  // 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 
  const handleSave = () => {
    if (!form.tenQTV || !form.tenDangNhap || !form.matKhau) {
      alert("Vui lòng nhập đầy đủ thông tin trước khi lưu!");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[600px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Chỉnh Sửa Quản Trị Viên
        </h2>

        {/* Form sửa thông tin */}
        <div className="flex flex-col gap-4">
          {/* Mã QTV */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã QTV</label>
            <input
              type="text"
              name="maQTV"
              value={form.maQTV}
              readOnly
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
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
            onClick={handleSave}
            className="bg-mainYellow text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
