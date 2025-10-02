import React, { useState, useEffect } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import AddOrEditEmployee from "./AddOrEditEmployee";
import ShowDetailEmployee from "./DetailEmployee";
import eye from "../../../assets/Icon/Eye.png";
import edit from "../../../assets/Icon/Edit.png";
import deleteIcon from "../../../assets/Icon/delete.png";
import ConfirmDialog from "../../../Components/dialog/confirmDialog";
import axiosClient from "../../../middleware/axiosClient";
import { toast } from "react-toastify";

export default function Employees() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [keyword, setKeyword] = useState(""); 

  // Lấy danh sách nhân viên (hoặc search)
  const fetchEmployees = async (searchKeyword = "") => {
    try {
      const res = searchKeyword
        ? await axiosClient.get(`/employee/search?keyword=${searchKeyword}`)
        : await axiosClient.get("/employee");
      setEmployees(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu nhân viên:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Xử lý khi nhập vào SearchBar
  const handleSearch = (value) => {
    setKeyword(value);
    fetchEmployees(value);
  };

  // Gọi khi click icon delete
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenConfirm(true);
  };

  // Gọi khi bấm "Xác nhận" trong ConfirmDialog
  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return; // tránh lỗi null
    try {
      const res = await axiosClient.put(`/employee/delete/${selectedEmployee.MaNV}`);
      
      toast.success(res.data.message || "Xóa nhân viên thành công");
      // cập nhật lại danh sách
      setEmployees((prev) => prev.filter((e) => e.MaNV !== selectedEmployee.MaNV));

      // reset state
      setOpenConfirm(false);
      setSelectedEmployee(null);

    } catch (err) {
      console.error("Lỗi khi xóa nhân viên:", err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* ConfirmDialog */}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa nhân viên "${selectedEmployee?.MaNV}" không?`}
      />

      {/* Thanh trên */}
      <div className="bg-[#2A435D] p-4 flex items-center justify-between">
        <SearchBar placeholder="Tìm kiếm nhân viên..." onSearch={handleSearch}/>
        <button
          className="bg-white text-[#2A435D] font-bold px-6 h-12 rounded-full text-xl shadow-md hover:bg-gray-100 flex items-center justify-center cursor-pointer"
          onClick={() => {setShowAddForm(true); setShowAddForm(true);}}
        >
          <span>THÊM</span>
        </button>
      </div>

      {/* Bảng */}
      <div className="bg-[#FFF8F0] p-4 m-5 rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-1 overflow-y-auto scrollbar-hide">
        <Table className="overflow-y-auto"
          data={employees.map((e) => ({
            ID: e.MaNV,
            "Tên nhân viên": e.TenNV,
            "Địa chỉ": e.DiaChi,
            "Số điện thoại": e.SDT,
            "Mã vai trò": e.MaVT,
            "Xem": (
              <img
                src={eye}
                alt="eye"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setSelectedEmployee(e);
                  setShowDetail(true);
                }}
              />
            ),

            "Sửa": (
              <img
                src={edit}
                alt="edit"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setSelectedEmployee(e);
                  setShowAddForm(true);
                }}
              />
            ),
            "Xóa": (
              <img
                src={deleteIcon}
                alt="delete"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteClick(e)}
              />
            ),
          }))}
        />
      </div>

      {/* Overlay AddOrEditEmployee */}
      {showAddForm && (
        <AddOrEditEmployee
          onClose={() => { setShowAddForm(false); setSelectedEmployee(null); }}
          employee={selectedEmployee}
          onSuccess={(emp) => {
            setEmployees((prev) => {
              const index = prev.findIndex(e => e.MaNV === emp.MaNV);
              // nếu sửa, replace
              if (index !== -1) {
                const newArr = [...prev];
                newArr[index] = emp;
                return newArr;
              }
              // nếu thêm, push
              return [...prev, emp];
            });
          }}
        />
      )}
      {/* Overlay ShowDetailEmployee */}
      {showDetail && (
        <ShowDetailEmployee
          onClose={() => { setShowDetail(false); setSelectedEmployee(null); }}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
}
