import React, { useState, useEffect } from "react";
import axiosClient from "../../../middleware/axiosClient";
import { toast } from "react-toastify";

export default function AddOrEditEmployee({ onClose , employee, onSuccess }) {
  const [formData, setFormData] = useState({
    MaNV: "",
    TenNV: "",
    DiaChi: "",
    SDT: "",
    MaVT: "",
  });

  const [roles, setRoles] = useState([]); // Danh sách vai trò từ API

  // Lấy danh sách vai trò khi mở form
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosClient.get("/role"); // API lấy danh sách vai trò
        setRoles(res.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách vai trò:", err);
      }
    };
    fetchRoles();
  }, []);

  //Lấy mã mới
  useEffect(() => {
    if (!employee) {
      const fetchNextId = async () => {
        try {
          const res = await axiosClient.get("/employee/nextid");
          setFormData((prev) => ({
            ...prev,
            MaNV: res.data.nextId || ""
          }));
        } catch (err) {
          console.error("Lỗi khi lấy mã nhân viên mới:", err);
        }
      };
      fetchNextId();
    }
  }, [employee]);
  
  // Khi prop employee thay đổi → set lại dữ liệu
  useEffect(() => {
    if (employee) {
      setFormData({
        MaNV: employee.MaNV || "",
        TenNV: employee.TenNV || "",
        DiaChi: employee.DiaChi || "",
        SDT: employee.SDT || "",
        MaVT: employee.MaVT || "VT00001",
      });
    } else {
      setFormData({
        MaNV: "",
        TenNV: "",
        DiaChi: "",
        SDT: "",
        MaVT: "VT00001",
      });
    }
  }, [employee]);

    // Cập nhật state khi nhập input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


    // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employee) {
        // UPDATE
        const res = await axiosClient.put(`/employee/update/${formData.MaNV}`, formData);
        // Check success
        if (!res.data.success) {
          toast.error(res.data.message || "Dữ liệu không hợp lệ");
          return;
        }
        toast.success(res.data.message || "Sửa nhân viên thành công");
        onSuccess(res.data.employee.data); 
      } else {
        // ADD
        const res = await axiosClient.post(`/employee`, formData);
        // Check success
        if (!res.data.success) {
          toast.error(res.data.message || "Dữ liệu không hợp lệ");
          return;
        }
        toast.success(res.data.message || "Thêm nhân viên thành công");
        onSuccess(res.data.employee);
      }
      onClose();
    } catch (err) {
      const msg = err.response?.data?.error?.message || "Lỗi server";
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer" onClick={onClose}>
      <div className="bg-[#FFF8F0] rounded-2xl shadow-xl w-[450px] p-6 cursor-auto" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-center text-[#2A435D] mb-4 border-b pb-2">
          {employee ? "Sửa Nhân Viên" : "Thêm Nhân Viên"}
        </h2>

        <form className="space-y-3"> 
          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Mã nhân viên</label>
              <input
                type="text"
                name="MaNV"
                value={formData.MaNV || ""}
                onChange={handleChange}
                className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2 opacity-50"
                disabled
              />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Tên nhân viên</label>
              <input
                type="text"
                name="TenNV"
                value={formData.TenNV || ""}
                onChange={handleChange}
                className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
              />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Địa chỉ</label>
              <input
                type="text"
                name="DiaChi"
                value={formData.DiaChi || ""}
                onChange={handleChange}
                className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
              />
          </div>

          <div>
              <label className="block text-3x text-[#2A435D] font-bold mb-1">Số điện thoại</label>
              <input
                type="number"
                name="SDT"
                value={formData.SDT || ""}
                onChange={handleChange}
                className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
              />
          </div>

          <div>
            <label className="block text-3x text-[#2A435D] font-bold mb-1">Vai trò</label>
            <select
              name="MaVT"
              value={formData.MaVT || "VT00001"}
              onChange={handleChange}
              className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2 outline-none"
            >
              {roles.map((role) => (
                <option key={role.MaVT} value={role.MaVT}>
                  {role.TenVT}
                </option>
              ))}
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-bold cursor-pointer"
              onClick={handleSubmit}
            >
              {employee ? "Lưu thay đổi" : "Xác nhận thêm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
