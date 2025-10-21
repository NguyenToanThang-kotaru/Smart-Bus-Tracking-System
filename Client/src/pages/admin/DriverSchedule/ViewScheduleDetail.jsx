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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Popup */}
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-3/7 min-w-[700px] gap-y-[35px] select-none">
        <h2 className="text-4xl font-bold text-mainBlue">
          Chi tiết lịch làm việc
        </h2>

        {/* Thông tin lịch */}
        <div className="flex gap-x-[50px] justify-center">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-2xl text-mainBlue font-bold">Ngày</label>
            <input
              type="text"
              defaultValue={item?.NgayHanhTrinh?.split("T")[0] || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-2xl text-mainBlue font-bold">Ca</label>
            <input
              type="text"
              defaultValue={item?.TenTD || ""}
              readOnly={isView}
              className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full ${
                isView ? "bg-gray-100" : "focus:outline-mainYellow"
              }`}
            />
          </div>
        </div>

        {/* Danh sách trạm */}
        <div className="border-2 bg-[#F5F5F5] rounded-lg border-gray-300 p-2 ">
          {tram.map((t) => (
            <div key={t.MaTram} className="p-2 rounded">
              {/* Header trạm */}
              <div
                className="bg-mainBlue text-xl flex items-center justify-between rounded-lg cursor-pointer select-none"
                onClick={() => toggleTram(t.MaTram)}
              >
                <h3 className="font-bold text-white py-2 px-5">{t.TenTram}</h3>
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
                <ul className="mx-3 list-disc text-gray-700">
                  {chiTietTram
                    .filter((hs) => hs.MaTram === t.MaTram)
                    .map((hs) => (
                      <li key={hs.MaHS} className="border border-gray p-1.5 bg-white flex justify-between px-[20px] ">
                        <div className="font-semibold flex-2">{hs.TenHS} </div>
                        <div className="font-semibold flex-1">{hs.MaHS} </div>
                        <div className="font-semibold flex-1">{hs.Lop} </div>
                        <div className="flex-1">
                            <div
                              className={`flex font-semibold border-2 rounded-lg w-[100px] justify-center ${
                                hs.TrangThai === "Đã đón" ? "text-mainYellow border-mainYellow" : "text-mainBlue border-mainBlue"
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
