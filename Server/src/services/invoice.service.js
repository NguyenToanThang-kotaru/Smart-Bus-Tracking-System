const invoiceModel = require('../models/invoice.model');

exports.getAllInvoices = (callback) => {
  invoiceModel.getAllInvoices(callback)
};

exports.getInvoiceById = (id, callback) => {
  invoiceModel.getInvoiceById(id, callback);
};

exports.getInvoiceStay = (callback) => {
  invoiceModel.getInvoiceStay(callback);
}


exports.getNextInvoiceId = (callback) => {
  invoiceModel.getLastInvoiceId((err, lastId) => {
    if (err) return callback(err);

    let newId = "HD00001";
    if (lastId) {
      const num = parseInt(lastId.replace("HD", "")) + 1;
      newId = "HD" + num.toString().padStart(5, "0");
    }
    callback(null, newId);
  });
};

exports.getInvoicesByMonth = (month, year, callback) => {
  invoiceModel.getInvoicesByMonth(month,year,callback)
}

exports.getInvoiceTakeAway = (callback) => {
  invoiceModel.getInvoiceTakeAway(callback)
}

exports.addInvoice = (data, callback) => {
  invoiceModel.addInvoice(data, (err, result) => {
    if (err) return callback(err);
    callback(null, { ...data});
  });
};
