import React from "react";

export default function AddCustomer({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer" onClick={onClose}>
      <div className="bg-[#FFF8F0] rounded-2xl shadow-xl w-[450px] p-6 cursor-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center text-[#2A435D] mb-4 border-b pb-2">
          Thêm Khách Hàng
        </h2>

        <form className="space-y-3"> 
          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Mã Khách Hàng</label>
              <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Tên Khách Hàng</label>
              <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Số Điện Thoại</label>
              <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Email</label>
              <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-bold cursor-pointer"
            >
              Xác nhận thêm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
