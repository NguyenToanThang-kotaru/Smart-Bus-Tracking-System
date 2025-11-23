import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";
import { Search, Bus, Route } from "lucide-react";

export default function AssignmentForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit" ? "Sửa Phân Công" : mode === "view" ? "Xem Phân Công" : "Thêm Phân Công";

  const [MaPC, setMaPC] = useState(data?.MaPC || "");
  const [MaTX, setMaTX] = useState(data?.MaTX || "");
  const [SoXeBuyt, setSoXeBuyt] = useState(data?.SoXeBuyt || "");
  const [MaTD, setMaTD] = useState(data?.MaTD || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNextIdOrPopulate = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("schedule/assignment/nextid");
          const next = res.data?.nextId ?? res.data;
          setMaPC(next || "");
        } catch (err) {
          console.error("Lỗi lấy mã phân công tiếp theo:", err);
          toast.error("Lấy mã phân công tiếp theo thất bại");
        }
      } else {
        setMaPC(data?.MaPC ?? "");
        setMaTX(data?.MaTX ?? "");
        setSoXeBuyt(data?.SoXeBuyt ?? "");
        setMaTD(data?.MaTD ?? "");
      }
    };
    getNextIdOrPopulate();
  }, [mode, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isView) return onClose();

    if (!MaTX || !SoXeBuyt || !MaTD) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      if (mode === "add") {
        const payload = MaPC ? { MaPC, MaTX, SoXeBuyt, MaTD } : { MaTX, SoXeBuyt, MaTD };
        console.log("POST schedule/assignment payload:", payload);
        const res = await axiosClient.post("schedule/assignment", payload);
        console.log("POST response:", res?.data);
        if (res?.data?.success === false) toast.error(res.data.message || "Thêm phân công thất bại");
        else {
          toast.success(res?.data?.message || "Thêm phân công thành công");
          if (reload) await reload();
          onClose();
        }
      } else if (mode === "edit") {
        const payload = {MaPC, MaTX, SoXeBuyt, MaTD};
        console.log("PUT schedule/assignment/update payload:", payload, "id:", MaPC);
        const res = await axiosClient.put(`schedule/assignment/update/${encodeURIComponent(MaPC)}`, payload);
        console.log("PUT response:", res?.data);
        if (res?.data?.success === false) toast.error(res.data.message || "Cập nhật phân công thất bại");
        else {
          toast.success(res?.data?.message || "Cập nhật phân công thành công");
          if (reload) await reload();
          onClose();
        }
      }
    } catch (err) {
      console.error("Lỗi xử lý phân công:", err);
      const msg = err?.response?.data?.message || err?.message;
      if (err?.response?.status === 401) toast.error("Bạn chưa đăng nhập / token hết hạn");
      else toast.error(msg || "Lỗi server khi xử lý phân công");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-2/5 gap-y-[20px]">
        <h2 className="text-3xl font-bold text-mainBlue">{title}</h2>

        <div className="space-y-3">
          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Mã phân công</label>
            <input
              type="text"
              value={MaPC}
              onChange={(e) => setMaPC(e.target.value)}
              readOnly={mode === "edit" || isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${isView ? "bg-gray-100" : "focus:outline-mainYellow"}`}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tài xế</label>
            <div className="relative">
              <input
                type="text"
                value={MaTX}
                onChange={(e) => setMaTX(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${isView ? "bg-gray-100" : "focus:outline-mainYellow"}`}
              />
              <Search className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Xe buýt</label>
            <div className="relative">
              <input
                type="text"
                value={SoXeBuyt}
                onChange={(e) => setSoXeBuyt(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${isView ? "bg-gray-100" : "focus:outline-mainYellow"}`}
              />
              <Bus className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="text-xl text-mainBlue font-bold">Tuyến đường</label>
            <div className="relative">
              <input
                type="text"
                value={MaTD}
                onChange={(e) => setMaTD(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${isView ? "bg-gray-100" : "focus:outline-mainYellow"}`}
              />
              <Route className="absolute right-2 top-2.5 text-yellow-500 w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button disabled={loading} type="submit" className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500">
              {loading ? "Đang xử lý..." : "XÁC NHẬN"}
            </button>
          )}
          <button type="button" onClick={onClose} className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900">
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}