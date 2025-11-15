export default function BusManagerForm({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Quản Lý" : mode === "view" ? "Xem Quản Lý" : "Thêm Quản Lý";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-2/7 gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã người dùng</label>
            <input type="text"
              defaultValue={data?.maND || ""} 
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên người dùng</label>
            <input type="text"
              defaultValue={data?.tenND || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên đăng nhập</label>
            <input type="text"
              defaultValue={data?.tenDangNhap || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mật khẩu</label>
            <input type="text"
              defaultValue={data?.matKhau || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
              XÁC NHẬN
            </button>
          )}
          <button onClick={onClose} className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900">
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}