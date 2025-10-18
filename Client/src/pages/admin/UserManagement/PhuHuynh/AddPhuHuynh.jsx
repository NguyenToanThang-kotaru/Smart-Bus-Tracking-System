import { useState } from "react";

export default function AddDriverModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    maTaiXe: "",
    soCCCD: "",
    bacBL: "",
    tenTaiXe: "",
    soDienThoai: "",
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
    if (
      !form.maTaiXe ||
      !form.soCCCD ||
      !form.bacBL ||
      !form.tenTaiXe ||
      !form.soDienThoai
    ) {
      alert("Vui lòng nhập đầy đủ thông tin tài xế!");
      return;
    }
    onAdd(form);
    onClose();
    setForm({
      maTaiXe: "",
      soCCCD: "",
      bacBL: "",
      tenTaiXe: "",
      soDienThoai: "",
      tenDangNhap: "",
      matKhau: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thêm Tài Xế
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex justify-between gap-8">
          {/* Cột trái */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã tài xế</label>
              <input
                type="text"
                name="maTaiXe"
                value={form.maTaiXe}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                placeholder="Nhập mã tài xế"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Số CCCD</label>
              <input
                type="text"
                name="soCCCD"
                value={form.soCCCD}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                placeholder="Nhập số CCCD"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Bậc bằng lái</label>
              <input
                type="text"
                name="bacBL"
                value={form.bacBL}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                placeholder="Nhập bậc bằng lái"
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
                placeholder="Nhập tên đăng nhập"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên tài xế</label>
              <input
                type="text"
                name="tenTaiXe"
                value={form.tenTaiXe}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                placeholder="Nhập tên tài xế"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Số điện thoại</label>
              <input
                type="text"
                name="soDienThoai"
                value={form.soDienThoai}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                placeholder="Nhập số điện thoại"
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
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
        </form>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-mainYellow text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
