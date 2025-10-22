import { useState } from "react";
import view from "@/assets/Icon/viewYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import del from "@/assets/Icon/deleteYellow.png";

export default function ScheduleForm({ onClose, mode, data }) {
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
        : isList
        "Danh Sách Chuyến"
        ;

    const handleView = (trip) => {
        setSelectedTrip(trip);
        setCurrentMode("view");
    };

    const handleEdit = (trip) => {
        setSelectedTrip(trip);
        setCurrentMode("edit");
    };

    const handleDelete = (trip) => {
        if (window.confirm(`Xóa chuyến của ${trip.driver}?`)) {
        setTripList((prev) => prev.filter((t) => t !== trip));
        }
    };

    const handleBackToList = () => {
        setSelectedTrip(null);
        setCurrentMode("list");
    };

    const handleSaveEdit = () => {
        alert("Đã lưu thay đổi!");
        setCurrentMode("list");
    };

    return ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"> 
            <div className="bg-white flex flex-col rounded-[40px] px-[40px] py-[30px] w-[525px] max-h-[90vh] shadow-2xl overflow-hidden"> 
                <h2 className="text-3xl font-bold text-mainBlue text-center ">{title}</h2>

                {/* --- Danh sách chuyến --- */}
                {isList && (
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 rounded-lg">
                        <div className="text-center text-lg font-semibold text-gray-700 mb-2 sticky top-0 bg-white py-2 z-10">
                            <h3 className="text-center text-xl font-bold text-mainBlue ">
                                Danh Sách Các Chuyến
                            </h3>
                            {data?.shift} – {data?.date}
                        </div>

                        {tripList.map((trip, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border border-gray-200 rounded-[15px] p-4 shadow-sm hover:shadow-md transition-all duration-200 bg-gray-50 hover:bg-white"
                        >
                            <div className="flex flex-col text-gray-700">
                                <span className="font-semibold text-base">{trip.driver}</span>
                                <span className="text-sm text-gray-500">{trip.bus}</span>
                                <span className="text-sm text-gray-500">{trip.route}</span>
                            </div>

                            <div className="flex gap-4 items-center">
                                <img
                                    src={view}
                                    alt="view"
                                    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                    onClick={() => handleView(trip)}
                                />
                                <img
                                    src={edit}
                                    alt="edit"
                                    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                    onClick={() => handleEdit(trip)}
                                />
                                <img
                                    src={del}
                                    alt="delete"
                                    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                    onClick={() => handleDelete(trip)}
                                />
                            </div>
                        </div>
                    ))}
                        {tripList.length === 0 && (
                            <p className="text-gray-400 italic text-center">Không có chuyến nào</p>
                        )}
                    </div>
                )}

                {/* --- Chế độ xem chi tiết --- */}
                {isView && selectedTrip && (
                    <div className="flex flex-col text-gray-700 gap-3 overflow-y-auto max-h-[60vh]">
                        <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                            <p className="font-semibold text-lg mb-2 text-center">Chi tiết chuyến</p>
                            <p><strong>Tài xế:</strong> {selectedTrip.driver}</p>
                            <p><strong>Xe buýt:</strong> {selectedTrip.bus}</p>
                            <p><strong>Tuyến:</strong> {selectedTrip.route}</p>
                        </div>
                    </div>
                )}

                {/* --- Chế độ sửa --- */}
                {isEdit && selectedTrip && (
                    <form className="flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Tài xế</label>
                            <input
                                type="text"
                                defaultValue={selectedTrip.driver}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-mainYellow focus:ring-mainYellow focus:ring-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Xe buýt</label>
                            <input
                                type="text"
                                defaultValue={selectedTrip.bus}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-mainYellow focus:ring-mainYellow focus:ring-1"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700">Tuyến đường</label>
                            <input
                                type="text"
                                defaultValue={selectedTrip.route}
                                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:border-mainYellow focus:ring-mainYellow focus:ring-1"
                            />
                        </div>
                    </form>
                )}

                {/* --- Nút điều hướng --- */}
                <div className="flex justify-end mt-6 gap-4 sticky bottom-0 bg-white pt-3">
                    {(isView || isEdit) && (
                        <button
                            onClick={handleBackToList}
                            className="text-lg bg-gray-300 w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-gray-400"
                        >
                        Trở lại
                        </button>
                    )}

                    {isEdit && (
                        <button
                            onClick={handleSaveEdit}
                            className="text-lg bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
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
