const routeModel = require('../models/route.model');

/* ====== TUYẾN ĐƯỜNG ====== */

exports.getAllRoutes = (callback) => {
  routeModel.getAllRoutes(callback);
};

exports.getRouteById = (MaTD, callback) => {
  routeModel.getRouteById(MaTD, callback);
};

exports.addRoute = (data, callback) => {
  if (!data.MaTD || !data.TenTD) {
    return callback(new Error('Thiếu thông tin tuyến đường cần thiết'), null);
  }

  const newRoute = {
    MaTD: data.MaTD,
    TenTD: data.TenTD,
  };

  routeModel.addRoute(newRoute, (err) => {
    if (err) return callback(err);
    callback(null, { message: 'Thêm tuyến đường thành công' });
  });
};

exports.updateRoute = (MaTD, data, callback) => {
  if (!data.TenTD) {
    return callback(new Error('Thiếu dữ liệu để cập nhật tuyến đường'), null);
  }
  routeModel.updateRoute(MaTD, data, callback);
};

exports.deleteRoute = (MaTD, callback) => {
  routeModel.deleteRoute(MaTD, callback);
};

/* ====== TRẠM ====== */

exports.getAllStations = (callback) => {
  routeModel.getAllStations(callback);
};

exports.getStationById = (MaTram, callback) => {
  routeModel.getStationById(MaTram, callback);
};

exports.addStation = (data, callback) => {
  if (!data.MaTram || !data.MaTuyenDuong || !data.TenTram) {
    return callback(new Error('Thiếu thông tin trạm cần thiết'), null);
  }

  const newStation = {
    MaTram: data.MaTram,
    MaTuyenDuong: data.MaTuyenDuong,
    TenTram: data.TenTram,
    x: data.x,
    y: data.y,
  };

  routeModel.addStation(newStation, (err) => {
    if (err) return callback(err);
    callback(null, { message: 'Thêm trạm thành công' });
  });
};

exports.updateStation = (MaTram, data, callback) => {
  if (!data.TenTram || !data.MaTuyenDuong) {
    return callback(new Error('Thiếu dữ liệu để cập nhật trạm'), null);
  }
  routeModel.updateStation(MaTram, data, callback);
};

exports.deleteStation = (MaTram, callback) => {
  routeModel.deleteStation(MaTram, callback);
};

/* ====== XE BUÝT ====== */

exports.getAllBuses = (callback) => {
  routeModel.getAllBuses(callback);
};

exports.getBusById = (SoXeBuyt, callback) => {
  routeModel.getBusById(SoXeBuyt, callback);
};

exports.addBus = (data, callback) => {
  if (!data.SoXeBuyt || !data.BienSoXe || !data.SucChua) {
    return callback(new Error('Thiếu thông tin xe buýt cần thiết'), null);
  }

  const newBus = {
    SoXeBuyt: data.SoXeBuyt,
    BienSoXe: data.BienSoXe,
    SucChua: data.SucChua,
    TrangThaiXe: data.TrangThaiXe,
  };

  routeModel.addBus(newBus, (err) => {
    if (err) return callback(err);
    callback(null, { message: 'Thêm xe buýt thành công' });
  });
};

exports.updateBus = (SoXeBuyt, data, callback) => {
  if (!data.BienSoXe || !data.SucChua) {
    return callback(new Error('Thiếu dữ liệu để cập nhật xe buýt'), null);
  }
  routeModel.updateBus(SoXeBuyt, data, callback);
};

exports.deleteBus = (SoXeBuyt, callback) => {
  routeModel.deleteBus(SoXeBuyt, callback);
};