import React, { useState } from "react";
import BackButton from "../../../Components/backButton";
import Table from "../../../Components/table_cpn";

export default function AddOrEditPermisson() {
  // Mảng tạm 
  const [functions, setFunctions] = useState([
    { id: 1, name: "Quản lý nhân viên" },
    { id: 2, name: "Quản lý sản phẩm" },
    { id: 3, name: "Quản lý hóa đơn" },
  ]);

  // State lưu quyền (checkbox)
  const [permissions, setPermissions] = useState({});

  // Xử lý toggle checkbox
  const handleCheckboxChange = (id, type) => {
    setPermissions((prev) => {
      const current = prev[id] || {};
      let updated = { ...current, [type]: !current[type] };

      // Nếu tick Sửa hoặc Xóa => Xem phải = true
      if ((type === "edit" || type === "delete") && updated[type]) {
        updated.view = true;
      }

      // Nếu bỏ tick Xem => bỏ luôn cả Sửa và Xóa
      if (type === "view" && !updated.view) {
        updated.edit = false;
        updated.delete = false;
      }

      return {
        ...prev,
        [id]: updated,
      };
    });
  };

  // Chuẩn bị data cho Table
  const tableData = functions.map((func) => ({
    "Tên chức năng": func.name,
    "Xem": (
      <input
        type="checkbox"
        checked={permissions[func.id]?.view || false}
        onChange={() => handleCheckboxChange(func.id, "view")}
      />
    ),
    "Thêm": (
      <input
        type="checkbox"
        checked={permissions[func.id]?.add || false}
        onChange={() => handleCheckboxChange(func.id, "add")}
      />
    ),
    "Sửa": (
      <input
        type="checkbox"
        checked={permissions[func.id]?.edit || false}
        onChange={() => handleCheckboxChange(func.id, "edit")}
      />
    ),
    "Xóa": (
      <input
        type="checkbox"
        checked={permissions[func.id]?.delete || false}
        onChange={() => handleCheckboxChange(func.id, "delete")}
      />
    ),
  }));

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#2A435D] p-4 flex justify-end w-full h-[75px]">
        <BackButton url="./permissions" />
      </div>

      <div className="bg-[#FFF8F0] p-1 m-1 flex flex-1 flex-row overflow-y-auto scrollbar-hide">
        {/* Form nhập thông tin quyền */}
        <div className="flex flex-col justify-start rounded-4xl m-5 px-10 py-5 gap-5 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-[1]">
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Mã quyền
            </label>
            <input
              type="text"
              className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Tên quyền
            </label>
            <input
              type="text"
              className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
            />
          </div>

          <button
            onClick={() => console.log(permissions)}
            className="w-full bg-green-500 text-white font-bold py-3 my-4 rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] hover:bg-green-600"
          >
            Xác Nhận Thêm / Lưu Thay Đổi
          </button>
        </div>

        {/* Danh sách chức năng */}
        <div className="m-5 px-10 py-5 rounded-4xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-[3] overflow-y-auto scrollbar-hide">
          <label className="block text-3xl text-[#2A435D] font-bold mb-3 border-b-2 border-[#2A435D] pb-2">
            Danh sách chức năng
          </label>

          <Table data={tableData} />
        </div>
      </div>
    </div>
  );
}
