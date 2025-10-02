import React from "react";

const ConfirmDialog = ({ open, onClose, onConfirm, title = "Xác nhận", message = "Bạn có chắc muốn thực hiện hành động này?" }) => {
  if (!open) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 cursor-pointer" >
      <div className="bg-white rounded-2xl shadow-lg w-[400px] cursor-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-2 bg-[#2A435D] text-white p-2 pl-4">{title}</h2>
        <p className="text-gray-600 mb-6 p-2">{message}</p>

        <div className="flex justify-end gap-3 p-2 border-t-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg  text-white bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#2A435D] text-white hover:bg-[#16293f] cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;