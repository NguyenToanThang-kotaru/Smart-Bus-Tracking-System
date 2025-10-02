import React, { useState } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import AddOrEditSupplier from "./AddOrEditSupplier";
import eye from "../../../assets/Icon/Eye.png";

export default function Suppliers() {
  const [showAddForm, setShowAddForm] = useState(false);
    if (showAddForm) {
      return <AddOrEditSupplier onBack={() => setShowAddForm(false)} />;
    }
  
    return (
      <div className="h-full flex flex-col">
        <div className="bg-[#2A435D] p-4 flex items-center justify-between h-[75px]">
          <SearchBar></SearchBar>
          <button 
            className="bg-white text-[#2A435D] font-bold px-6 h-12 rounded-full text-xl shadow-md hover:bg-gray-100 flex items-center justify-center"
            onClick={() => setShowAddForm(true)}
          >
            <span>THÊM</span>
          </button>
  
        </div>
        <div className="bg-[#FFF8F0] m-5 rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-1 overflow-y-auto scrollbar-hide">
          <Table className="overflow-y-auto"
            data={[
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 1, name: "nhà cung cấp A", phone: "0987654321",watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />, edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              
            ]}
          />
        </div>
      </div>
    );
}