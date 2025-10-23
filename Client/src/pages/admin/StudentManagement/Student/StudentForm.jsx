export default function StudentForm({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Học Sinh" : mode === "view" ? "Xem Học Sinh" : "Thêm Học Sinh";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-[600px] gap-y-[35px]">
        <h2 className="text-4xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Mã học sinh</label>
            <input type="text"
              defaultValue={data?.maHS || ""} 
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Tên học sinh</label>
            <input type="text"
              defaultValue={data?.tenHS || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Lớp</label>
            <input type="text"
              defaultValue={data?.lop || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Phụ huynh</label>
            <input type="text"
              defaultValue={data?.maPH || ""}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-2xl text-mainBlue font-bold">Trạm đăng ký</label>
            <select
              defaultValue={data?.maTram || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            >
              <option value="TRAM000001">TRAM000001</option>
              <option value="TRAM000002">TRAM000002</option>
              <option value="TRAM000003">TRAM000003</option>
            </select>
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