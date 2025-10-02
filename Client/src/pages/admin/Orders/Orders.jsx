// src/pages/admin/Dashboard/Dashboard.jsx
import React from "react";
import Table from "../../../Components/table_cpn";
import eye from "../../../assets/Icon/Eye.png";
import pd from "../../../assets/Icon/product.png";

export default function Orders() {
  return (
    <div>
      <div className="bg-[#FFF8F0] p-4 rounded-2xl shadow-md">
        <Table
          data={[
            { name: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, age: 30, city: "New York", hello: "world", nickname: "JohnDoe", phone: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" /> },
            { name: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, age: 30, city: "New York", hello: "world", nickname: "JohnDoe", phone: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" /> },
            { name: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, age: 30, city: "New York", hello: "world", nickname: "JohnDoe", phone: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" /> },
          ]}
        />
      </div>
    </div>
  );
}
