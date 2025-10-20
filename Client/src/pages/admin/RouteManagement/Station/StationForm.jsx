export default function StationForm({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Trạm" : mode === "view" ? "Xem Trạm" : "Thêm Trạm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-[600px] gap-y-[35px]">
        <h2 className="text-4xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="space-y-3">
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Mã trạm</label>
            <input
              type="text"
              defaultValue={data?.id || ""}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Thuộc Tuyến</label>
            <input
              type="text"
              defaultValue={data?.route || ""}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Tên trạm</label>
            <input
              type="text"
              defaultValue={data?.name || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-[50px]">
            <div className="flex flex-col gap-y-2">
              <label className="text-2xl text-mainBlue font-bold">Tọa độ X</label>
              <input
                type="text"
                defaultValue={data?.x || ""}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
            </div>
            <div className="flex flex-col gap-y-2"> 
              <label className="text-2xl text-mainBlue font-bold">Tọa độ Y</label>
              <input
                type="text"
                defaultValue={data?.y || ""}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button className="text-xl bg-mainYellow w-[170px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
              XÁC NHẬN
            </button>
          )}
          <button onClick={onClose} className="text-xl bg-mainBlue w-[170px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900">
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}
