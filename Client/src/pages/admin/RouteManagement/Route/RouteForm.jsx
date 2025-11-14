import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";
import addStation from "@/assets/Icon/addStationYellow.png";
import Table from "@/Components/tableComponent";

export default function RouteForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit"
      ? "Sửa Tuyến Đường"
      : mode === "view"
      ? "Xem Tuyến Đường"
      : "Thêm Tuyến Đường";

  const [MaTD, setMaTD] = useState(data?.MaTD || "");
  const [TenTD, setTenTD] = useState(data?.TenTD || "");
  const [stations, setStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [showStationPicker, setShowStationPicker] = useState(false);

  // Lấy dữ liệu khi mở form
  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("routes/tuyenduong/nextID");
          setMaTD(res.data.newCode || "");
        } catch (err) {
          console.error(err);
          toast.error("Lỗi khi lấy mã tuyến tiếp theo!");
        }
      }
    };

    const getStations = async () => {
      try {
        const res = await axiosClient.get("routes/tram");
        const all = res.data;
        setAllStations(all);

        if (mode === "edit" || mode === "view") {
          // Lấy các trạm thuộc tuyến hiện tại
          const selected = all
            .filter((s) => s.MaTuyenDuong === data.MaTD)
            .map((s) => s.MaTram);
          setStations(selected);
        }
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi lấy danh sách trạm!");
      }
    };

    getNextId();
    getStations();

    if (mode === "edit" || mode === "view") {
      setMaTD(data?.MaTD || "");
      setTenTD(data?.TenTD || "");
    }
  }, [mode, data]);

  // Thêm/xóa trạm khỏi danh sách tuyến
  const toggleStation = (MaTram) => {
    if (isView) return;
    setStations((prev) =>
      prev.includes(MaTram) ? prev.filter((t) => t !== MaTram) : [...prev, MaTram]
    );
  };

  // Lưu dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await axiosClient.post("routes/tuyenduong", { MaTD, TenTD, stations });
        toast.success("Thêm tuyến đường thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`routes/tuyenduong/${MaTD}`, { MaTD, TenTD, stations });
        toast.success("Cập nhật tuyến đường thành công!");
      }
      if (reload) await reload();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi lưu dữ liệu tuyến đường!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-[600px] gap-y-[35px]"
      >
        <h2 className="text-4xl font-bold text-mainBlue">{title}</h2>

        {/* Mã tuyến */}
        <div className="flex flex-col gap-y-2">
          <label className="text-2xl text-mainBlue font-bold">Mã tuyến đường</label>
          <input
            type="text"
            value={MaTD}
            readOnly
            className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100"
          />
        </div>

        {/* Tên tuyến */}
        <div className="flex flex-col gap-y-2">
          <label className="text-2xl text-mainBlue font-bold">Tên tuyến đường</label>
          <input
            type="text"
            value={TenTD}
            onChange={(e) => setTenTD(e.target.value)}
            readOnly={isView}
            className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
              isView ? "bg-gray-100" : "focus:outline-mainYellow"
            }`}
          />
        </div>

        {/* Trạm */}
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <label className="text-2xl text-mainBlue font-bold">Trạm thuộc tuyến</label>
            {!isView && (
              <button
                type="button"
                className="cursor-pointer hover:scale-95 border-2 rounded-[10px] border-mainYellow text-mainYellow font-semibold px-3 py-1 transition flex gap-x-[10px] items-center"
                onClick={() => setShowStationPicker(true)}
              >
                Chọn trạm
                <img src={addStation} alt="addStation" className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="border-2 rounded-[10px] p-2 w-full max-h-[200px] overflow-y-auto">
            <Table
              data={stations.map((MaTram) => {
                const station = allStations.find((s) => s.MaTram === MaTram);
                return {
                  "Mã trạm": station?.MaTram,
                  "Tên trạm": station?.TenTram,
                };
              })}
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              type="submit"
              className="text-xl bg-mainYellow w-[170px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              XÁC NHẬN
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xl bg-mainBlue w-[170px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>

      {/* Popup chọn trạm */}
      {showStationPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-mainBlue mb-4">Chọn trạm</h3>
            <div className="max-h-[60vh] overflow-y-auto">
              <Table
                data={allStations
                  .filter(
                    (station) =>
                      !station.MaTuyenDuong || station.MaTuyenDuong === MaTD
                  )
                  .map((station) => ({
                    "Mã trạm": station.MaTram,
                    "Tên trạm": station.TenTram,
                    "Chọn": (
                      <input
                        type="checkbox"
                        checked={stations.includes(station.MaTram)}
                        onChange={() => toggleStation(station.MaTram)}
                        disabled={isView}
                      />
                    ),
                  }))}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowStationPicker(false)}
                className="px-4 py-2 bg-mainBlue text-white rounded-[10px] hover:bg-blue-900"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
