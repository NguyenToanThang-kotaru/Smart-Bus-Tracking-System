import React, { useEffect, useState } from "react";

export default function EditBusManageModal({ open, onClose, busManage, onSave }) {
  const [form, setForm] = useState({
    maNguoiDung: "",
    tenNguoiDung: "",
    tenDangNhap: "",
    matKhau: "",
  });

  useEffect(() => {
    if (busManage) {
      setForm({
        maNguoiDung: busManage.maNguoiDung || "",
        tenNguoiDung: busManage.tenNguoiDung || "",
        tenDangNhap: busManage.tenDangNhap || "",
        matKhau: busManage.matKhau || "",
      });
    }
  }, [busManage]);

  if (!open || !busManage) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[600px] shadow-lg relative">
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Chỉnh Sửa Người Quản Lý Xe Buýt
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã người dùng</label>
            <input
              type="text"
              name="maNguoiDung"
              value={form.maNguoiDung}
              readOnly
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-600"
            />
          </div>

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

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
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
