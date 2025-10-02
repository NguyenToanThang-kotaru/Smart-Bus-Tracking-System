import React, { useState } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import AddOrEditPermisson from "./AddOrEditPermisson";
import eye from "../../../assets/Icon/Eye.png";
export default function Permissons() {
  const [showAddForm, setShowAddForm] = useState(false);
  if (showAddForm) {
    return <AddOrEditPermisson onBack={() => setShowAddForm(false)} />;
  }
  return (
    <div className="h-full">
      <div className="bg-[#2A435D] p-4 flex items-center justify-between">
        <SearchBar></SearchBar>
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
            { ID: 1, "Tên quyền": "Admin", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, "Sửa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>,  "Xóa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />  },
            { ID: 1, "Tên quyền": "Admin", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, "Sửa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>,  "Xóa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />  },
            { ID: 1, "Tên quyền": "Admin", "Xem": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, "Sửa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>,  "Xóa": <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />  },
          ]}
        />
      </div>
    </div>
  );
}