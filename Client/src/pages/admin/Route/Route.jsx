import { useState } from "react";
import Table from "../../../Components/table_cpn";
import eye from "../../../assets/Icon/Eye.png";
import del from "../../../assets/Icon/delete.png";
import Edit from "../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";

export default function Route() {
  const [invoices, setInvoices] = useState([
          {
              MaTram: "00000",
              name: "Nguyen van A",
              total: 9999,
              status: "Pending",
              paymentMethod: "Tiền mặt",
              date: "12:00 24/08/2025",
              tableNumber: "0000",
              items: [
                  { name: "Món A", qty: 2, price: 230000 },
                  { name: "Món B", qty: 1, price: 120000 },
              ],
          },
          {
              MaTram: "00001",
              name: "Nguyen van B",
              total: 8888,
              status: "Done",
              paymentMethod: "Chuyển khoản",
              date: "13:00 24/08/2025",
              tableNumber: "00000001",
              items: [{ name: "Món C", qty: 3, price: 50000 }],
          },
      ]);
  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar placeholder="Value..." />
        <AddButton />
      </div>
      <div className="mt-10">
      
        <Table 
          data={invoices.map((inv) => ({
            "Mã Trạm": inv.MaTram,
                          
            "Chức năng": (
              <button className="focus:outline-none flex gap-x-5">
                <img src={Edit} alt="edit" className="w-6 h-6 icon-yellow " />
                <img src={eye} alt="eye" className="w-6 h-6 icon-yellow " />
                <img src={del} alt="delete" className="w-6 h-6 icon-yellow" />
              </button>
            ),
        }))}
                      
        />
      </div>
    </div>
    
  )}