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
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Thêm Tài Xế
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Mã tài xế chiếm 2 cột */}
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

          {/* Hai cột */}
          <div className="flex justify-between gap-8">
            {/* Cột trái */}
            <div className="flex flex-col w-1/2 gap-4">
              {/* Số CCCD */}
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

              {/* Bậc bằng lái (ComboBox) */}
              <div className="flex flex-col">
                <label className="font-medium text-sm mb-1">Bậc bằng lái</label>
                <select
                  name="bacBL"
                  value={form.bacBL}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-full p-2 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-mainBlue"
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
                  placeholder="Nhập tên tài xế"
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
                  name="soDienThoai"
                  value={form.soDienThoai}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
                  placeholder="Nhập số điện thoại"
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
                  placeholder="Nhập tên đăng nhập"
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
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>
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
