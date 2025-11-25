import { useState } from "react";
import axiosClient from "@/middleware/axiosClient";
import view from "@/assets/Icon/viewYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import del from "@/assets/Icon/deleteYellow.png";

export default function ScheduleForm({ onClose, mode, data, reload }) {
    const [currentMode, setCurrentMode] = useState(mode);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [tripList, setTripList] = useState(data?.trips || []);

    const isList = currentMode === "list";
    const isView = currentMode === "view";
    const isEdit = currentMode === "edit";

    const title = isEdit
        ? "Sửa Lịch Trình"
        : isView
        ? "Xem Lịch Trình"
        : "Danh Sách Chuyến";

    const handleView = (trip) => {
        setSelectedTrip(trip);
        setCurrentMode("view");
    };
    const handleEdit = (trip) => {
        setSelectedTrip(trip);
        setCurrentMode("edit");
    };
    const handleDelete = async (trip) => {
        if (!trip?.raw?.MaLT) return;
        if (!window.confirm(`Bạn chắc chắn muốn xóa lịch trình ${trip.raw.MaLT}?`)) return;
        try {await axiosClient.put(`/schedule/delete/${trip.raw.MaLT}`);
            if (typeof reload === "function") reload();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };
    const handleBackToList = () => {
        setSelectedTrip(null);
        setCurrentMode("list");
    };
    const handleSaveEdit = async () => {
        if (!selectedTrip?.raw?.MaLT) return;
        const updated = {
            MaTX: document.getElementById("tx").value,
            NgayHanhTrinh: document.getElementById("date").value,
            CaHanhTrinh: document.getElementById("shift").value,
            TrangThai: document.getElementById("status").value
        };
        try {await axiosClient.put(`/schedule/update/${selectedTrip.raw.MaLT}`, updated);
            if (typeof reload === "function") reload();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white flex flex-col rounded-[40px] px-[40px] py-[30px] w-[525px] max-h-[90vh] shadow-2xl overflow-hidden">

                <h2 className="text-3xl font-bold text-mainBlue text-center ">{title}</h2>

                {isList && (
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        <div className="text-center text-lg font-semibold text-gray-700 mb-2">
                            <h3 className="text-xl font-bold text-mainBlue">Danh Sách Các Chuyến</h3>
                            {data?.shift} – {data?.date}
                        </div>

                        {tripList.map((trip, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border border-gray-200 rounded-[15px] p-4 shadow-sm bg-gray-50 hover:bg-white transition"
                            >
                                <div className="flex flex-col text-gray-700">
                                    <span className="font-semibold text-base">{trip.driver}</span>
                                    <span className="text-sm text-gray-500">{trip.bus}</span>
                                    <span className="text-sm text-gray-500">LT: {trip.raw?.MaLT}</span>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <img
                                        src={view}
                                        className="w-5 cursor-pointer hover:scale-110"
                                        onClick={() => handleView(trip)}
                                    />
                                    <img
                                        src={edit}
                                        className="w-5 cursor-pointer hover:scale-110"
                                        onClick={() => handleEdit(trip)}
                                    />
                                    <img
                                        src={del}
                                        className="w-5 cursor-pointer hover:scale-110"
                                        onClick={() => handleDelete(trip)}
                                    />
                                </div>
                            </div>
                        ))}

                        {tripList.length === 0 && (
                            <p className="text-center italic text-gray-400">Không có chuyến nào</p>
                        )}
                    </div>
                )}

                {isView && selectedTrip && (
                    <div className="flex flex-col text-gray-700 gap-3 max-h-[60vh] overflow-y-auto">
                        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                            <p className="font-semibold text-lg mb-2 text-center">Chi tiết chuyến</p>
                            <p><strong>Mã LT:</strong> {selectedTrip.raw?.MaLT}</p>
                            <p><strong>Tài xế:</strong> {selectedTrip.driver}</p>
                            <p><strong>Xe buýt:</strong> {selectedTrip.bus}</p>
                            <p><strong>Tuyến:</strong> {selectedTrip.route}</p>
                        </div>
                    </div>
                )}

                {isEdit && selectedTrip && (
                    <form className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">

                        <div>
                            <label className="text-sm font-semibold">Mã lịch trình</label>
                            <input
                                type="text"
                                value={selectedTrip.raw?.MaLT}
                                disabled
                                className="border rounded-lg px-3 py-2 w-full bg-gray-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Tài xế</label>
                            <input
                                id="tx"
                                type="text"
                                defaultValue={selectedTrip.driver}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Ngày hành trình</label>
                            <input
                                id="date"
                                type="date"
                                defaultValue={selectedTrip.raw?.NgayHanhTrinh}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Ca</label>
                            <input
                                id="shift"
                                type="text"
                                defaultValue={selectedTrip.raw?.CaHanhTrinh}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Trạng thái</label>
                            <input
                                id="status"
                                type="text"
                                defaultValue={selectedTrip.raw?.TrangThai}
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>
                    </form>
                )}

                <div className="flex justify-end mt-6 gap-4">
                    {(isView || isEdit) && (
                        <button
                            onClick={handleBackToList}
                            className="text-lg bg-gray-300 w-[130px] font-bold py-2 rounded-[10px] hover:bg-gray-400"
                        >
                            Trở lại
                        </button>
                    )}

                    {isEdit && (
                        <button
                            onClick={handleSaveEdit}
                            className="text-lg bg-mainYellow w-[130px] font-bold py-2 rounded-[10px] hover:bg-yellow-500"
                        >
                            Lưu
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="text-lg bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
