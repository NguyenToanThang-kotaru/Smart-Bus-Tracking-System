import React, { useState } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import eye from "../../../assets/Icon/Eye.png";
import edit from "../../../assets/Icon/Edit.png";
import xoa from "../../../assets/Icon/delete.png";
import AddCustomer from "./AddCustomer";
export default function Customers() {

  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div className="h-full">
      <div className="bg-[#2A435D] p-4 flex items-center justify-between">
        <SearchBar />
        <button 
          className="bg-white text-[#2A435D] font-bold px-6 h-12 rounded-full text-xl shadow-md hover:bg-gray-100 flex items-center justify-center"
          onClick={() => setShowAddForm(true)}
        >
          <span>THÊM</span>
        </button>

      </div>
      <div className="bg-[#FFF8F0] p-4 m-5 rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]">
        <Table
          data={[
            { ID: 1, "Tên khách hàng": "Nguyễn Văn A", "Số điện thoại": "0123456789", "Email": "abc@gmail.com", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, "Sửa": <img src={edit} alt="edit" className="w-6 h-6 cursor-pointer"/>, "Xóa": <img src={xoa} alt="xoa" className="w-6 h-6 cursor-pointer" /> },
            { ID: 2, "Tên khách hàng": "Nguyễn Văn B", "Số điện thoại": "0123456789", "Email": "def@gmail.com", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, "Sửa": <img src={edit} alt="edit" className="w-6 h-6 cursor-pointer" />, "Xóa": <img src={xoa} alt="xoa" className="w-6 h-6 cursor-pointer" /> },
            { ID: 3, "Tên khách hàng": "Nguyễn Văn C", "Số điện thoại": "0123456789", "Email": "ghi@gmail.com", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, "Sửa": <img src={edit} alt="edit" className="w-6 h-6 cursor-pointer" />, "Xóa": <img src={xoa} alt="xoa" className="w-6 h-6 cursor-pointer" /> }
          ]}
        />
      </div>

      {showAddForm && (
        <AddCustomer onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}