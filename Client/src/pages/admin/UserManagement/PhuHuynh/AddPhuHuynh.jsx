import { useState } from "react";

export default function AddPhuHuynhModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    maPhuHuynh: "",
    tenPhuHuynh: "",
    soDienThoai: "",
    tenDangNhap: "",
    matKhau: "",
    hocSinh: "",
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
          Thêm Phụ Huynh
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex justify-between gap-8">
          {/* Cột trái (Mã, SĐT, Tên đăng nhập, Mật khẩu) */}
          <div className="flex flex-col w-1/2 gap-4">
            {/* Mã phụ huynh */}
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã phụ huynh</label>
              <input
                type="text"
                name="maPhuHuynh"
                value={form.maPhuHuynh}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Số điện thoại</label>
              <input
                type="text"
                name="soDienThoai"
                value={form.soDienThoai}
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

          {/* Cột phải (Tên phụ huynh + Học sinh) */}
          <div className="flex flex-col w-1/2 gap-4">
            {/* Tên phụ huynh */}
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên phụ huynh</label>
              <input
                type="text"
                name="tenPhuHuynh"
                value={form.tenPhuHuynh}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            {/* Học sinh */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-1">
                    <label className="font-medium text-sm">Học sinh</label>
                    <button
                        type="button"
                        onClick={() => alert("Hiển thị modal chọn học sinh")}
                        className="bg-mainYellow text-sm font-medium px-3 py-1 rounded-lg hover:opacity-90 transition"
                    >
                    + Thêm học sinh
                        </button>
                </div>
              
              <textarea readOnly
                name="hocSinh"
                value={form.hocSinh}
                onChange={handleChange}
                placeholder="Chọn học sinh"
                className="border border-gray-300 rounded-xl p-2 px-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-mainBlue"
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
