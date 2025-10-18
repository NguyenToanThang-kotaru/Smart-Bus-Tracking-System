import { useEffect, useState } from "react";

export default function EditHocSinhModal({ open, onClose, hocSinh, onSave }) {
  const [form, setForm] = useState({
    MaHocSinh: "",
    TenHocSinh: "",
    Lop: "",
    Tram: "",
    maPhuHuynh: "",
    tenPhuHuynh: "",
  });

  // Khi modal mở, nạp dữ liệu học sinh vào form
  useEffect(() => {
    if (hocSinh) {
        console.log("📦 Dữ liệu phuHuynh nhận được:", hocSinh);
      setForm({
        MaHocSinh: hocSinh.MaHocSinh || "",
        TenHocSinh: hocSinh.TenHocSinh || "",
        Lop: hocSinh.Lop || "",
        Tram: hocSinh.Tram || "",
        maPhuHuynh: hocSinh.maPhuHuynh || "",
        tenPhuHuynh: hocSinh.tenPhuHuynh || "",
      });
    }
  }, [hocSinh]);

  // Hàm xử lý khi người dùng nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm lưu (submit)
  const handleSave = (e) => {
    e.preventDefault();
    onSave(form); // gửi dữ liệu về component cha
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-8 w-[800px] shadow-lg relative">
        <h2 className="text-2xl font-bold text-mainBlue mb-4 border-b-[2px] border-mainBlue pb-2">
          Chỉnh sửa thông tin học sinh
        </h2>

        <form className="flex justify-between gap-8" onSubmit={handleSave}>
          {/* Cột trái */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã học sinh</label>
              <input
                type="text"
                name="MaHocSinh"
                value={form.MaHocSinh}
                readOnly
                className="border border-gray-300 rounded-full p-2 px-4 bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên học sinh</label>
              <input
                type="text"
                name="TenHocSinh"
                value={form.TenHocSinh}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Lớp</label>
              <input
                type="text"
                name="Lop"
                value={form.Lop}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Trạm</label>
              <input
                type="text"
                name="Tram"
                value={form.Tram}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Mã phụ huynh</label>
              <input
                type="text"
                name="MaPhuHuynh"
                value={form.maPhuHuynh}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium text-sm mb-1">Tên phụ huynh</label>
              <input
                type="text"
                name="TenPhuHuynh"
                value={form.tenPhuHuynh}
                onChange={handleChange}
                className="border border-gray-300 rounded-full p-2 px-4 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              />
            </div>
          </div>
        </form>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSave}
            className="bg-mainYellow text-black font-semibold px-6 py-2 rounded-md hover:opacity-90 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
