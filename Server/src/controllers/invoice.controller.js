const invoiceService = require("../services/invoice.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllInvoice = (req, res) => {
    invoiceService.getAllInvoices((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getInvoiceStay = (req, res) => {
  invoiceService.getInvoiceStay((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
}

exports.getInvoiceById = (req, res) => {
  const id = req.params.id;

  invoiceService.getInvoiceById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy hóa đơnnnn" });
    res.json(result);
  });
};

exports.getNextInvoiceId = (req, res) => {
  invoiceService.getNextInvoiceId((err, nextId) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nextId });
  });
};

exports.getInvoicesByMonth = (req, res) => {
  const { month, year } = req.params;

  invoiceService.getInvoicesByMonth(month, year, (err, invoices) => {
    if (err) {
      console.error("Lỗi khi lấy hóa đơn theo tháng:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.json(invoices);
  });
};

exports.getInvoiceTakeAway = (req, res) => {
  invoiceService.getInvoiceTakeAway((err, results) => {
    if (err) return res.status(500).json({ error: "Lỗi sever" });
    res.json(results);
  });
}

exports.addInvoice = (req, res) => {
  const invoiceData = req.body;

  invoiceService.addInvoice(invoiceData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Thêm hóa đơn thành công", invoice: result });
  });
};