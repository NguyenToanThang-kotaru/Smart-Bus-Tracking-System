import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../../../middleware/axiosClient";

export default function ShowDetailEmployee({ onClose, employee }) {
  if (!employee) return null;

  const [roleName, setRoleName] = useState([]); // vai trò từ API

  // Lấy vai trò khi mở form
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosClient.get(`/role/${employee.MaVT}`); // API lấy vai trò
        setRoleName(res.data.TenVT || "");
      } catch (err) {
        console.error("Lỗi khi lấy vai trò:", err);
      }
    };
    fetchRoles();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-[#FFF8F0] rounded-2xl shadow-xl w-[450px] p-6 cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-[#2A435D] mb-4 border-b pb-2">
          Thông tin nhân viên
        </h2>

        <div className="space-y-3 text-[#2A435D]">
          <div>
            <span className="font-bold">Mã nhân viên: </span>
            <span>{employee.MaNV}</span>
          </div>
          <div>
            <span className="font-bold">Tên nhân viên: </span>
            <span>{employee.TenNV}</span>
          </div>
          <div>
            <span className="font-bold">Địa chỉ: </span>
            <span>{employee.DiaChi}</span>
          </div>
          <div>
            <span className="font-bold">Số điện thoại: </span>
            <span>{employee.SDT}</span>
          </div>
          <div>
            <span className="font-bold">Vai trò: </span>
            <span>{employee.MaVT}</span>
          </div>
          <div>
            <span className="font-bold">Tên vai trò: </span>
            <span>{roleName}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#2A435D] text-white font-bold hover:bg-[#16293f]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}