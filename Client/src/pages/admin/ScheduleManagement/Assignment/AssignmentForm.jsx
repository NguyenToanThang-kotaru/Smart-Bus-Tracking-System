import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";
import { Search, Bus, Route } from "lucide-react";

export default function AssignmentForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit"
      ? "Sửa Phân Công"
      : mode === "view"
      ? "Xem Phân Công"
      : "Thêm Phân Công";

  const [MaPC, setMaPC] = useState(data?.MaPC || "");
  const [MaTX, setMaTX] = useState(data?.MaTX || "");
  const [SoXeBuyt, setSoXeBuyt] = useState(data?.SoXeBuyt || "");
  const [MaTD, setMaTD] = useState(data?.MaTD || "");
  const [loading, setLoading] = useState(false);
  const [driverList, setDriverList] = useState([]);
  const [busList, setBusList] = useState([]);
  const [routeList, setRouteList] = useState([]);

  useEffect(() => {
    const normalize = (res) => {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data?.data)) return res.data.data;
      const values = Object.values(res).find((v) => Array.isArray(v));
      return values || [];
    };

    const loadDrivers = async () => {
      try {
        const res = await axiosClient.get("users/admin/driver");
        setDriverList(normalize(res));
      } catch {
        setDriverList([]);
      }
    };

    const loadBus = async () => {
      try {
        const res = await axiosClient.get("routes/xebuyt"); // chỉnh API theo bạn
        setBusList(normalize(res));
      } catch {
        setBusList([]);
      }
    };

    const loadRoute = async () => {
      try {
        const res = await axiosClient.get("routes/tuyenduong"); // chỉnh API theo bạn
        setRouteList(normalize(res));
      } catch {
        setRouteList([]);
      }
    };

    loadDrivers();
    loadBus();
    loadRoute();
  }, []);

  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("schedule/assignment/nextid");
          const next = res.data?.nextId ?? res.data;
          setMaPC(next || "");
        } catch (err) {
          console.error("Lỗi lấy mã phân công:", err);
        }
      } else {
        setMaPC(data?.MaPC || "");
        setMaTX(data?.MaTX || "");
        setSoXeBuyt(data?.SoXeBuyt || "");
        setMaTD(data?.MaTD || "");
      }
    };
    getNextId();
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
      const payload = { MaPC, MaTX, SoXeBuyt, MaTD };

      let res =
        mode === "add"
          ? await axiosClient.post("schedule/assignment", payload)
          : await axiosClient.put(
              `schedule/assignment/update/${MaPC}`,
              payload
            );

      if (res?.data?.success === false) toast.error(res.data.message);
      else {
        toast.success(
          mode === "add"
            ? "Thêm phân công thành công"
            : "Cập nhật phân công thành công"
        );
        reload && reload();
        onClose();
      }
    } catch (err) {
      toast.error("Lỗi server");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[40px] px-[50px] py-[30px] w-2/5 gap-y-[20px]"
      >
        <h2 className="text-3xl font-bold text-mainBlue">{title}</h2>

        {/* --- Phân công --- */}
        <div className="flex flex-col gap-y-2">
          <label className="text-xl text-mainBlue font-bold">Mã phân công</label>
          <input
            type="text"
            value={MaPC}
            readOnly
            className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100"
          />
        </div>

        {/* --- Tài xế --- */}
        <div className="flex flex-col gap-y-2">
          <label className="text-xl text-mainBlue font-bold">Tài xế</label>
          <div className="relative">
            <select
              value={MaTX}
              onChange={(e) => setMaTX(e.target.value)}
              disabled={isView}
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 min-h-[40px] w-full pr-10 appearance-none"
            >
              <option value="">-- Chọn tài xế --</option>
              {driverList.map((d) => (
                <option key={d.MaTX} value={d.MaTX}>
                  {d.MaTX} – {d.TenND ?? ""}
                </option>
              ))}
            </select>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-mainYellow w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* --- Xe Buýt --- */}
        <div className="flex flex-col gap-y-2">
          <label className="text-xl text-mainBlue font-bold">Xe buýt</label>
          <div className="relative">
            <select
              value={SoXeBuyt}
              onChange={(e) => setSoXeBuyt(e.target.value)}
              disabled={isView}
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 min-h-[40px] w-full pr-10 appearance-none"
            >
              <option value="">-- Chọn xe buýt --</option>
              {busList.map((b) => (
                <option key={b.SoXeBuyt} value={b.SoXeBuyt}>
                  {b.SoXeBuyt} - {b.BienSoXe}
                </option>
              ))}
            </select>
            <Bus className="absolute right-3 top-1/2 -translate-y-1/2 text-mainYellow w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* --- Tuyến đường --- */}
        <div className="flex flex-col gap-y-2">
          <label className="text-xl text-mainBlue font-bold">Tuyến đường</label>
          <div className="relative">
            <select
              value={MaTD}
              onChange={(e) => setMaTD(e.target.value)}
              disabled={isView}
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 min-h-[40px] w-full pr-10 appearance-none"
            >
              <option value="">-- Chọn tuyến đường --</option>
              {routeList.map((r) => (
                <option key={r.MaTD} value={r.MaTD}>
                  {r.MaTD} - {r.TenTD}
                </option>
              ))}
            </select>
            <Route className="absolute right-3 top-1/2 -translate-y-1/2 text-mainYellow w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* --- Nút điều hướng --- */}
        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              disabled={loading}
              type="submit"
              className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              {loading ? "Đang xử lý..." : "XÁC NHẬN"}
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