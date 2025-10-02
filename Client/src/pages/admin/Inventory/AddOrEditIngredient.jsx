import React from "react";

export default function SelectIngredient({ onClose, onAdd }) {
  return (
    <div className="flex flex-col bg-[#FFF8F0] p-6 rounded-4xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-130">
      
      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Mã nguyên liệu</label>
        <input
          type="text"
          className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Tên nguyên liệu</label>
        <input
          type="text"
          className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
        />
      </div>

      <div className="mb-4">
        <label className="block text-2xl text-[#2A435D] font-bold mb-1">Đơn vị nguyên liệu</label>
        <input
          type="text"
          className="bg-white w-full rounded-full px-4 py-2 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
        />
      </div>

      <button
        className="block bg-green-600 text-white px-4 py-3 mt-4 rounded-full hover:bg-green-700 "
        onClick={onAdd}
      >
        Thêm
      </button>
      <button
        className="block bg-red-500 text-white px-4 py-3 mt-4 rounded-full hover:bg-red-600"
        onClick={onClose}
      >
        Hủy
      </button>
    </div>
    
  );
}