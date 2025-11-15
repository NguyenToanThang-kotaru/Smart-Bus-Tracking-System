import { Search, Bus, Route } from "lucide-react";

export default function AssignmentForm({ onClose, mode, data }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Phân Công" : mode === "view" ? "Xem Phân Công" : "Thêm Phân Công";
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-1/3 min-w-[450px] gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="space-y-3">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã phân công</label>
            <input type="text" 
              defaultValue={data?.MaPC || ""}  
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px]${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tài xế</label>
            <div className="relative">
              <input type="text" 
                defaultValue={data?.MaTX || ""}  
                readOnly
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
              <Search className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Xe buýt</label>
            <div className="relative">
              <input type="text" 
                defaultValue={data?.MaXe || ""}  
                readOnly
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
              <Bus className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tuyến đường</label>
            <div className="relative">
              <input type="text" 
                defaultValue={data?.MaTD || ""}  
                readOnly
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
              <Route className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
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
