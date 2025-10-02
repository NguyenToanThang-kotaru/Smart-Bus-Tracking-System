import React, { useState } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import AddOrEditIngredient from "./AddOrEditIngredient";
import eye from "../../../assets/Icon/Eye.png";

export default function Inventory() {
    const [showAddForm, setShowAddForm] = useState(false);
 
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
              { ID: 1, name: "nguyen lieu 1", stock: "1000", donvi: "kg", edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 2, name: "nguyen lieu 2", stock: "1000", donvi: "kg", edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 3, name: "nguyen lieu 3", stock: "1000", donvi: "kg", edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
              { ID: 4, name: "nguyen lieu 4", stock: "1000", donvi: "kg", edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/>, delete: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer"/> },
            ]}
          />
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-20 ">
            <AddOrEditIngredient
              onClose={() => setShowAddForm(false)}
              onAdd={() => setShowAddForm(false)}
            />
          </div>
        )}
      </div>
    );
}