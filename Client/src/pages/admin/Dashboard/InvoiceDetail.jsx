import React from "react";

export default function InvoiceDetail({ open, onClose, invoice }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#FBF7F0] p-6 rounded-2xl w-[600px] shadow-lg">
        {/* Tiêu đề */}
        <h2 className="text-center text-2xl font-bold mb-4">CHICK AND BEEF</h2>

        {/* Thông tin chung */}
        <div className="space-y-1 text-[15px]">
          <p><b>Hóa đơn:</b> {invoice?.id}</p>
          <p><b>Ngày:</b> {invoice?.date}</p>
          <p><b>Hình thức thanh toán:</b> {invoice?.paymentMethod}</p>
          <p><b>Số bàn:</b> {invoice?.tableNumber}</p>
        </div>

        {/* Chi tiết */}
        <div className="mt-4">
          <p className="font-bold mb-1">Chi tiết hóa đơn:</p>
          <div className="border-t border-b py-2">
            <div className="grid grid-cols-3 font-bold mb-1">
              <span>Tên món</span>
              <span>Số lượng</span>
              <span className="text-right">Thành tiền</span>
            </div>
            {invoice?.items?.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3">
                <span>{item.name}</span>
                <span>{item.qty}</span>
                <span className="text-right">{item.price.toLocaleString()} VND</span>
              </div>
            ))}
          </div>
          <p className="text-right mt-2 font-bold">
            Tổng cộng: {invoice?.total.toLocaleString()} VND
          </p>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-6 py-2 rounded-full font-bold"
          >
            ĐÓNG
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full font-bold">
            IN HÓA ĐƠN
          </button>
        </div>
      </div>
    </div>
  );
}
