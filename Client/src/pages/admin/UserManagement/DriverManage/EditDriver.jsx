import React, { useEffect, useState } from "react";

export default function EditDriverModal({ open, onClose, onSave, driver }) {
  const [form, setForm] = useState({
    MaTaiXe: "",
    tenTaiXe: "",
    SoCCCD: "",
    BacBL: "",
    SoDT: "",
    tenDangNhap: "",
    matKhau: "",
  });

  
  useEffect(() => {
    if (driver) {
      console.log("📦 Dữ liệu driver nhận được:", driver);
      setForm({
        MaTaiXe: driver.MaTaiXe || "",
        tenTaiXe: driver.name || "",
        SoCCCD: driver.SoCCCD || "",
        BacBL: driver.BacBL || "",
        SoDT: driver.SoDT || "",
        tenDangNhap: driver.tenDangNhap || "",
        matKhau: driver.matKhau || "",
      });
    }
  }, [driver]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSave = () => {
    if (onSave) onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Chỉnh Sửa Tài Xế
        </h2>

        {/* Form chỉnh sửa */}
        <div className="flex flex-col gap-6">
          {/* Mã tài xế chiếm 2 cột */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã tài xế</label>
            <input
              readOnly
              type="text"
              name="MaTaiXe"
              value={form.MaTaiXe}
              className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Hai cột */}
          <div className="flex justify-between gap-8">
            {/* Cột trái */}
            <div className="flex flex-col w-1/2 gap-4">
              {/* Số CCCD */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Số CCCD</label>
                <input
                  type="text"
                  name="SoCCCD"
                  value={form.SoCCCD}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                />
              </div>

              {/* Bậc bằng lái */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Bậc bằng lái</label>
                <select
                  name="BacBL"
                  value={form.BacBL}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                >
                  <option value="">-- Chọn bậc bằng lái --</option>
                  <option value="D2">D2</option>
                  <option value="E">E</option>
                </select>
              </div>

              {/* Tên tài xế */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Tên tài xế</label>
                <input
                  type="text"
                  name="tenTaiXe"
                  value={form.tenTaiXe}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className="flex flex-col w-1/2 gap-4">
              {/* Số điện thoại */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Số điện thoại</label>
                <input
                  type="text"
                  name="SoDT"
                  value={form.SoDT}
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
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Hủy
          </button>

          <button
            type="button"
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
