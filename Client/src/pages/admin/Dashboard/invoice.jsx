import { useState } from "react";
import Table from "../../../Components/table_cpn";
import eye from "../../../assets/Icon/Eye.png";
import SearchBar from "@/Components/searchBar";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceStatus from "./InvoiceStatus";

export default function Invoices() {
  const [active, setActive] = useState("taiquan"); // mặc định chọn "Tại quán"
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([
    {
      id: "00000",
      name: "Nguyen van A",
      total: 9999,
      status: "Pending",
      paymentMethod: "Tiền mặt",
      date: "12:00 24/08/2025",
      tableNumber: "00000000",
      items: [
        { name: "Món A", qty: 2, price: 230000 },
        { name: "Món B", qty: 1, price: 120000 },
      ],
    },
    {
      id: "00001",
      name: "Nguyen van B",
      total: 8888,
      status: "Done",
      paymentMethod: "Chuyển khoản",
      date: "13:00 24/08/2025",
      tableNumber: "00000001",
      items: [{ name: "Món C", qty: 3, price: 50000 }],
    },
  ]);

  // Hàm xử lý chuyển status theo luồng Pending -> Done -> Paied
  const handleNextStatus = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          let next = inv.status;
          if (inv.status === "Pending") next = "Done";
          else if (inv.status === "Done") next = "Paied";
          return { ...inv, status: next };
        }
        return inv;
      })
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        {/* Buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => setActive("taiquan")}
            className={`cursor-pointer w-30 border p-2 font-bold rounded-4xl transition ${
              active === "taiquan"
                ? "bg-[#CC3333] text-white border-[#CC3333]"
                : "text-[#2A435D] hover:bg-gray-100"
            }`}
          >
            Tại quán
          </button>
          <button
            onClick={() => setActive("mangve")}
            className={`cursor-pointer w-30 border p-2 font-bold rounded-4xl transition ${
              active === "mangve"
                ? "bg-[#CC3333] text-white border-[#CC3333]"
                : "text-[#2A435D] hover:bg-gray-100"
            }`}
          >
            Mang về
          </button>
        </div>

        {/* Search */}
        <SearchBar placeholder="Value..." />
      </div>

      {/* Table */}
      <Table
        data={invoices.map((inv) => ({
          ID: inv.id,
          name: inv.name,
          total: inv.total,
          Status: (
            <InvoiceStatus invoice={inv} onNext={handleNextStatus} />
          ),
          watch: (
            <button
              onClick={() => setSelectedInvoice(inv)}
              className="focus:outline-none"
            >
              <img src={eye} alt="eye" className="w-6 h-6" />
            </button>
          ),
        }))}
      />

      {/* Popup */}
      <InvoiceDetail
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
