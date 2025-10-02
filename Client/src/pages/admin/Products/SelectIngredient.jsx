import React from "react";

export default function SelectIngredient({ onClose, onAdd }) {
  return (
    <div className="bg-[#FFF8F0] p-6 rounded-4xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-130">
      {/* Chọn Nguyên liệu */}
      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Nguyên liệu</label>
        <select className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]">
          <option value="">Chọn nguyên liệu</option>
          <option value="Thịt gà">Thịt gà</option>
          <option value="Rau xà lách">Rau xà lách</option>
        </select>
      </div>

      {/* Tự hiển thị đơn vị của nguyên liệu */}
      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Đơn vị nguyên liệu</label>
        <input
          type="text"
          className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
          readOnly
        />
      </div>

      {/* Định lượng */}
      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Định lượng</label>
        <input
          type="text"
          className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
          placeholder="Nhập số lượng"
        />
      </div>

      {/* Nút hành động */}
      <div className="flex justify-between">
        <button
          className="w-50 bg-green-600 text-white px-6 py-3 mt-8 rounded-full hover:bg-green-700 "
          onClick={onAdd}
        >
          Thêm
        </button>
        <button
          className="w-50 bg-red-500 text-white px-6 py-3 mt-8 rounded-full hover:bg-red-600"
          onClick={onClose}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}