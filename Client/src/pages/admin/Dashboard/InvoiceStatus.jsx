import React from "react";

export default function InvoiceStatusButton({ invoice, onNext }) {
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-300";
      case "Done":
        return "text-blue-400";
      case "Paied":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Hiển thị status */}
      <h1 className={`font-bold ${getColor(invoice.status)}`}>
        {invoice.status}
      </h1>
      {/*
      {invoice.status !== "Paied" && (
        <button
          onClick={() => onNext(invoice.id)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      )}
      */}
    </div>
  );
}
