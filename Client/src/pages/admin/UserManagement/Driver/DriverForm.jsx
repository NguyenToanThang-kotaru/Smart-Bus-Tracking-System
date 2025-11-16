// import { useState, useEffect } from "react";
// import axiosClient from "@/middleware/axiosClient";
// import { toast } from "react-toastify";

// export default function DriverForm({ onClose, mode, data, reload }) {
//   const isView = mode === "view";
//   const title =
//     mode === "edit" ? "Sửa Tài Xế" : mode === "view" ? "Xem Tài Xế" : "Thêm Tài Xế";

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-2/5 gap-y-[20px]">
//         <h2 className="text-3xl font-bold text-mainBlue">
//           {title}
//         </h2>

//         <div className="flex flex-col gap-2">
//           <div className="flex flex-col gap-y-2">
//             <label className="text-xl text-mainBlue font-bold">Mã người dùng</label>
//             <input type="text"
//               defaultValue={data?.maND || ""} 
//               readOnly
//               className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                 isView ? "bg-gray-100" : "focus:outline-mainYellow"
//               }`}
//             />
//           </div>
          
//           <div className="flex gap-x-[50px]">
//             <div className="flex flex-col w-full gap-y-2">
//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Tên người dùng</label>
//                 <input type="text"
//                   defaultValue={data?.tenND || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 />
//               </div>

//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Tên đăng nhập</label>
//                 <input type="text"
//                   defaultValue={data?.tenDangNhap || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 />
//               </div>

//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Mật khẩu</label>
//                 <input type="text"
//                   defaultValue={data?.matKhau || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col w-full gap-y-2">
//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Số căn cước công dân</label>
//                 <input type="text"
//                   defaultValue={data?.soCCCD || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 />
//               </div>

//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Số điện thoại</label>
//                 <input type="text"
//                   defaultValue={data?.sdt || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 />
//               </div>

//               <div className="flex flex-col gap-y-2">
//                 <label className="text-xl text-mainBlue font-bold">Bậc bằng lái</label>
//                 <select
//                   defaultValue={data?.bacBangLai || ""}
//                   readOnly={isView}
//                   className={`border-2 border-gray-300 rounded-[10px] px-3 w-full h-[35px] ${
//                     isView ? "bg-gray-100" : "focus:outline-mainYellow"
//                   }`}
//                 >
//                   <option value="">Chọn bậc bằng lái</option>
//                   <option value="D2">D2</option>
//                   <option value="E">E</option>
//                 </select>
//               </div>
//             </div>
            
//           </div>  
//         </div>

//         <div className="flex justify-end mt-6 gap-x-[30px]">
//           {!isView && (
//             <button className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
//               XÁC NHẬN
//             </button>
//           )}
//           <button onClick={onClose} className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900">
//             ĐÓNG
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";

export default function DriverForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";

  const title =
    mode === "edit" ? "Sửa Tài Xế" : mode === "view" ? "Xem Tài Xế" : "Thêm Tài Xế";

  const [maTX, setMaTX] = useState(data?.maTX || "");
  const [soCCCD, setSoCCCD] = useState(data?.soCCCD || "");
  const [sdt, setSdt] = useState(data?.sdt || "");
  const [bacBangLai, setBacBangLai] = useState(data?.bacBangLai || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axiosClient.post("users/admin/driver", {
          maTX,
          soCCCD,
          sdt,
          bacBangLai,
        });
        toast.success("Thêm tài xế thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`users/admin/driver/${maTX}`, {
          soCCCD,
          sdt,
          bacBangLai,
        });
        toast.success("Sửa thông tin tài xế thành công!");
      }

      if (reload) await reload();
      onClose();
    } catch (error) {
      toast.error("Lỗi xử lý dữ liệu tài xế!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-1/2 min-w-[600px] gap-y-[20px]"
      >
        <h2 className="text-3xl font-bold text-mainBlue">{title}</h2>

        <div className="flex flex-col gap-4">

          <div className="flex gap-x-[50px]">
            
            <div className="flex flex-col w-full gap-y-2">

              {/* Mã tài xế */}
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Mã tài xế</label>
                <input
                  type="text"
                  value={maTX}
                  onChange={(e) => setMaTX(e.target.value)}
                  readOnly={mode !== "add"}
                  className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 h-[35px] ${
                    mode !== "add"
                      ? "bg-gray-100 cursor-not-allowed"
                      : "focus:outline-mainYellow"
                  }`}
                />
              </div>

              {/* Số CCCD */}
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Số CCCD</label>
                <input
                  type="text"
                  value={soCCCD}
                  onChange={(e) => setSoCCCD(e.target.value)}
                  readOnly={isView}
                  className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 h-[35px] ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-y-2">

              {/* Số điện thoại */}
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Số điện thoại</label>
                <input
                  type="text"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  readOnly={isView}
                  className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 h-[35px] ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                />
              </div>

              {/* Bậc bằng lái */}
              <div className="flex flex-col gap-y-2">
                <label className="text-xl text-mainBlue font-bold">Bậc bằng lái</label>
                <select
                  value={bacBangLai}
                  onChange={(e) => setBacBangLai(e.target.value)}
                  disabled={isView}
                  className={`border-2 border-gray-300 rounded-[10px] px-3 h-[35px] ${
                    isView ? "bg-gray-100" : "focus:outline-mainYellow"
                  }`}
                >
                  <option value="">Chọn bậc bằng lái</option>
                  <option value="D2">D2</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              type="submit"
              className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              XÁC NHẬN
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}
