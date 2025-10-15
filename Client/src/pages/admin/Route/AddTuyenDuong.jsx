export default function AddTuyenDuong({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Tuyến Đường" : mode === "view" ? "Xem Tuyến Đường" : "Thêm Tuyến Đường";

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-mainBlue border-b pb-2 text-center">
          {title}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Mã tuyến đường</label>
            <input
              type="text"
              defaultValue={data?.id || ""}
              readOnly={isView}
              className={`border rounded-lg px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tên tuyến</label>
            <input
              type="text"
              defaultValue={data?.name || ""}
              readOnly={isView}
              className={`border rounded-lg px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-5">
          {!isView && (
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500">
              Xác nhận
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-4 py-2 rounded hover:bg-blue-900"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}