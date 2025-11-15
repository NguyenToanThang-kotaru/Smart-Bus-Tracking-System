import addStudent from "@/assets/Icon/addStudentYellow.png";
//import ParentsSelectedStudent from "./ParentsSelectedStudent";

export default function ParentsForm({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Phụ Huynh" : mode === "view" ? "Xem Phụ Huynh" : "Thêm Phụ Huynh";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-1/2 min-w-[600px] gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex gap-x-[50px]">
            <div className="flex flex-col w-full gap-y-2">
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Mã phụ huynh</label>
                <input type="text"
                  defaultValue={data?.maPH || ""} 
                  readOnly
                  className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Tên phụ huynh</label>
                <input type="text"
                  defaultValue={data?.tenPH || ""}
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

            <div className="flex flex-col w-full gap-y-2">
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Số điện thoại</label>
                <input type="text"
                  defaultValue={data?.sdt || ""}
                  readOnly={isView}
                  className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-y-2 h-full">
                <div className="flex items-center justify-between">
                  <label className="text-xl text-mainBlue font-bold">Học sinh</label>
                  <button
                    type="button"
                    className="cursor-pointer hover:scale-95 border-2 rounded-[10px] border-mainYellow text-mainYellow  font-semibold px-3 py-1 transition flex gap-x-[8px] text-[12px]"
                  >
                    Chọn học sinh
                    <img src={addStudent} alt="addStudent" className="w-4 h-4" />
                  </button>
                </div>
                <div 
                  readOnly={isView}
                  className={`border-2 h-full border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                />
              </div>

            
            </div>
            
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