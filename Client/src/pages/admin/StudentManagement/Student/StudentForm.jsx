import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";

export default function StudentForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Học Sinh" : mode === "view" ? "Xem Học Sinh" : "Thêm Học Sinh";

  const [MaHS, setMaHS] = useState(data?.MaHS || "");
  const [TenHS, setTenHS] = useState(data?.TenHS || "");
  const [Lop, setLop] = useState(data?.Lop || "");
  const [MaPH, setMaPH] = useState(data?.MaPH || "");
  const [MaTram, setMaTram] = useState(data?.MaTram || "");

  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("students/admin/nextid");
          setMaHS(res.data.nextId);
        } catch (err) {
          toast.error("Lỗi khi lấy mã học sinh tiếp theo!");
        }
      }
    };
    getNextId();
  }, [mode]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axiosClient.post("students/admin", { MaHS, TenHS, Lop, MaPH, MaTram });
        toast.success("Thêm học sinh thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`students/admin/update/${MaHS}`, { TenHS, Lop, MaPH, MaTram });
        toast.success("Sửa thông tin học sinh thành công!");
      }
      if (reload) await reload();
      onClose();
    } catch (err) {
      toast.error("Lỗi xử lý dữ liệu học sinh!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-2/7 gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">
          {title}
        </h2>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã học sinh</label>
            <input 
              type="text" value={MaHS} onChange={e => setMaHS(e.target.value)}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tên học sinh</label>
            <input 
              type="text" value={TenHS} onChange={e => setTenHS(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Lớp</label>
            <input 
              type="text" value={Lop} onChange={e => setLop(e.target.value)}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Phụ huynh</label>
            <input 
              type="text" value={MaPH} onChange={e => setMaPH(e.target.value)}
              readOnly
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Trạm đăng ký</label>
            <select
              value={MaTram} onChange={e => setMaTram(e.target.value)} disabled={isView} 
              className={`border-2 border-gray-300 rounded-[10px] px-3 w-full h-[35px] ${ isView ? "bg-gray-100" : "focus:outline-mainYellow" }`} >
              <option value="">Chọn tram</option>
              <option value="TR000001">TR000001</option>
              <option value="TR000002">TR000002</option>
              <option value="TR000003">TR000003</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button type="submit" className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
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