import { useState, useEffect } from "react";
import dropDown from "@/assets/Icon/arrow_drop_down.png";
import axiosClient from "@/middleware/axiosClient";

export default function ViewScheduleDetail({ item, onClose }) {
  const [groupedStudents, setGroupedStudents] = useState({});
  const [openTram, setOpenTram] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`schedule/stops/${item.MaLT}`)
      .then((res) => {
        const grouped = {};
        console.log(res.data)
        res.data.forEach((row) => {
          console.log(row)
          if (!grouped[row.MaTram]) grouped[row.MaTram] = [];
          if (row.MaHS) {
            grouped[row.MaTram].push(row);
          }
        });

        setGroupedStudents(grouped);
        console.log("Student group",groupedStudents)
      })
      .catch((err) => {
        console.error("Lỗi load trạm + học sinh:", err);
      });
  }, [item.MaLT]);

  //MỞ / ĐÓNG TRẠM
  const toggleTram = (maTram) => {
    setOpenTram((prev) => (prev === maTram ? null : maTram));
  };

  //CẬP NHẬT TRẠNG THÁI HỌC SINH
  const toggleTrangThai = async (MaLT, hs) => {
    if (!hs.MaHS) return;

    const newStatus = hs.TrangThai === 1 ? 0 : 1;

    try {
      await axiosClient.post("schedule/update-student-status", {
        MaLT,
        MaHS: hs.MaHS,
        TrangThai: newStatus,
      });
      console.log("Da update: ", hs.MaHS)
      setGroupedStudents((prev) => {
        const updated = { ...prev };
        const list = updated[hs.MaTram];
        const index = list.findIndex((x) => x.MaHS === hs.MaHS);
        list[index].TrangThai = newStatus;
    
        return updated;
      });
    } catch (error) {
      console.error("Lỗi update trạng thái:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-3/7 min-w-[700px] gap-y-[35px] select-none">
        <h2 className="text-4xl font-bold text-mainBlue">Chi tiết lịch làm việc</h2>

        {/* Thông tin lịch */}
        <div className="flex gap-x-[50px] justify-center">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-2xl text-mainBlue font-bold">Ngày</label>
            <input
              type="text"
              defaultValue={item?.NgayHanhTrinh?.split("T")[0] || ""}
              readOnly
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100"
            />
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-2xl text-mainBlue font-bold">Ca</label>
            <input
              type="text"
              defaultValue={item?.CaHanhTrinh || ""}
              readOnly
              className="border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Danh sách trạm */}
        <div className="border-2 bg-[#F5F5F5] rounded-lg border-gray-300 p-2">
          {Object.keys(groupedStudents).map((maTram) => {
            const students = groupedStudents[maTram];
            const tenTram = students[0]?.TenTram || "Không có học sinh";

            return (
              <div key={maTram} className="p-2 rounded">
                {/* Header trạm */}
                <div
                  className="bg-mainBlue text-xl flex items-center justify-between rounded-lg cursor-pointer select-none"
                  onClick={() => toggleTram(maTram)}
                >
                  <h3 className="font-bold text-white py-2 px-5">{tenTram}</h3>
                  <img
                    src={dropDown}
                    alt="dropdown"
                    className={`w-8 h-8 mr-2 transform transition-transform duration-300 ${
                      openTram === maTram ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>

                {/* Chỉ hiển thị danh sách khi CÓ học sinh */}
                {students.length > 0 && (
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      openTram === maTram ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="mx-3 list-disc text-gray-700">
                      {students.map((hs) => (
                        <li
                          key={hs.MaHS}
                          className="border border-gray p-1.5 bg-white flex justify-between px-[20px]"
                        >
                          <div className="font-semibold flex-2">{hs.TenHS}</div>
                          <div className="font-semibold flex-1">{hs.MaHS}</div>
                          <div className="font-semibold flex-1">{hs.Lop}</div>

                          <div className="flex-1">
                            <div
                              className={`flex font-semibold border-2 rounded-lg w-[100px] justify-center cursor-pointer
                                ${
                                  hs.TrangThai === 1
                                    ? "text-green-500 border-green-500"
                                    : "text-red-500 border-red-500"
                                }`}
                              onClick={() => toggleTrangThai(item.MaLT, hs)}
                            >
                              {hs.TrangThai === 1 ? "Đã đón" : "Chưa đón"}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Nút đóng */}
        <div className="flex justify-end mt-6 gap-x-[30px]">
          <button
            onClick={onClose}
            className="text-xl bg-mainBlue w-[170px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>
    </div>
  );
}