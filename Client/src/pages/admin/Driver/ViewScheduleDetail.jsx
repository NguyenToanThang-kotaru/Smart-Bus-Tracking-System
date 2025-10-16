import { useState } from "react";
import dropDown from "@/assets/Icon/arrow_drop_down.png";

export default function ViewScheduleDetail({ item, onClose }) {
  const isView = true;

  const tram = [
    { MaTram: "Tram000001", TenTram: "Trạm A" },
    { MaTram: "Tram000002", TenTram: "Trạm B" },
    { MaTram: "Tram000003", TenTram: "Trạm C" },
  ];

  const chiTietTram = [
    { MaTram: "Tram000001", TenHS: "Nguyen Thi A", MaHS: "HS000001", Lop: "6A1", TrangThai: "Đã đón" },
    { MaTram: "Tram000001", TenHS: "Nguyen Thi B", MaHS: "HS000002", Lop: "9A1", TrangThai: "Đã đón" },
    { MaTram: "Tram000001", TenHS: "Nguyen Thi C", MaHS: "HS000003", Lop: "6A3", TrangThai: "Đã đón" },
    { MaTram: "Tram000002", TenHS: "Nguyen Thi D", MaHS: "HS000004", Lop: "6A1", TrangThai: "Đã đón" },
    { MaTram: "Tram000002", TenHS: "Nguyen Thi E", MaHS: "HS000005", Lop: "9A1", TrangThai: "Đã đón" },
    { MaTram: "Tram000002", TenHS: "Nguyen Thi F", MaHS: "HS000006", Lop: "6A3", TrangThai: "Đã đón" },
    { MaTram: "Tram000002", TenHS: "Nguyen Thi G", MaHS: "HS000007", Lop: "6A3", TrangThai: "Chưa đón" },
    { MaTram: "Tram000003", TenHS: "Nguyen Thi H", MaHS: "HS000008", Lop: "9A2", TrangThai: "Chưa đón" },
    { MaTram: "Tram000003", TenHS: "Nguyen Thi I", MaHS: "HS000009", Lop: "8A1", TrangThai: "Chưa đón" },
  ];

  const [openTram, setOpenTram] = useState(null);

  const toggleTram = (maTram) => {
    setOpenTram((prev) => (prev === maTram ? null : maTram));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      {/* Popup */}
      <div className="bg-white rounded-lg p-6 z-10 w-2/3 relative max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-mainBlue border-b-4 border-mainBlue pb-2 text-left">
          Chi tiết lịch làm việc
        </h2>

        {/* Thông tin lịch */}
        <div className="space-y-3 flex gap-10 justify-between">
          <div className="w-full">
            <label className="block text-mainBlue text-sm font-bold mb-1">Ngày</label>
            <input
              type="text"
              defaultValue={item?.NgayHanhTrinh?.split("T")[0] || ""}
              readOnly={isView}
              className={`border rounded-full border-[#7d7d7d] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="w-full">
            <label className="block text-mainBlue text-sm font-bold mb-1">Ca</label>
            <input
              type="text"
              defaultValue={item?.TenTD || ""}
              readOnly={isView}
              className={`border rounded-full border-[#7d7d7d] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>
        </div>

        {/* Danh sách trạm */}
        <div className="border bg-[#F5F5F5] rounded-lg border-[#7d7d7d] p-2 mt-5">
          {tram.map((t) => (
            <div key={t.MaTram} className="p-2 rounded">
              {/* Header trạm */}
              <div
                className="bg-mainBlue text-2xl flex items-center justify-between rounded-lg cursor-pointer select-none"
                onClick={() => toggleTram(t.MaTram)}
              >
                <h3 className="font-bold text-white p-3">{t.TenTram}</h3>
                <img
                  src={dropDown}
                  alt="dropdown"
                  className={`w-8 h-8 mr-2 transform transition-transform duration-300 ${
                    openTram === t.MaTram ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Danh sách học sinh */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openTram === t.MaTram ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="ml-6 mr-6 list-disc text-gray-700">
                  {chiTietTram
                    .filter((hs) => hs.MaTram === t.MaTram)
                    .map((hs) => (
                      <li key={hs.MaHS} className="border border-gray p-2 bg-[#FAFAFA] shadow flex justify-between">
                        <div className="font-bold w-1/4">{hs.TenHS} </div>
                        <div className="font-bold w-1/4">{hs.MaHS} </div>
                        <div className="font-bold w-1/4">{hs.Lop} </div>
                        <div className="w-1/4 text-right">
                            <div
                              className={`font-bold border-4 w-fit px-4 rounded-lg ${
                                hs.TrangThai === "Đã đón" ? "text-[#F2BA1D] border-[#F2BA1D]" : "text-[#0B2347] border-[#0B2347]"
                              }`}
                            >
                              {hs.TrangThai}
                            </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Nút đóng */}
        <div className="flex justify-center gap-3 mt-5">
          {!isView && (
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500">
              Xác nhận
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-mainBlue text-white font-semibold px-4 py-2 rounded hover:bg-blue-900"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
