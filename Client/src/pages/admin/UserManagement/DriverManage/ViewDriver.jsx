import React, { useEffect, useState } from "react";

export default function ViewDriverModal({ open, onClose, driver }) {
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thông Tin Tài Xế
        </h2>

        {/* Form hiển thị thông tin */}
        <div className="flex flex-col gap-6">
          {/* Mã tài xế chiếm 2 cột */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1">Mã tài xế</label>
            <input
              readOnly
              type="text"
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
                  readOnly
                  type="text"
                  value={form.SoCCCD}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              {/* Bậc bằng lái */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Bậc bằng lái</label>
                <select
                  disabled
                  value={form.BacBL}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                >
                  <option value="">-- Chưa chọn --</option>
                  <option value="D2">D2</option>
                  <option value="E">E</option>
                </select>
              </div>

              {/* Tên tài xế */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Tên tài xế</label>
                <input
                  readOnly
                  type="text"
                  value={form.tenTaiXe}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                />
              </div>
            </div>

            {/* Cột phải */}
            <div className="flex flex-col w-1/2 gap-4">
              {/* Số điện thoại */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Số điện thoại</label>
                <input
                  readOnly
                  type="text"
                  value={form.SoDT}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              {/* Tên đăng nhập */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Tên đăng nhập</label>
                <input
                  readOnly
                  type="text"
                  value={form.tenDangNhap}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              {/* Mật khẩu */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Mật khẩu</label>
                <input
                  readOnly
                  type="password"
                  value={form.matKhau}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100 text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

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
