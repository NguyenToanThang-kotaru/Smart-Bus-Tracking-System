const routeModel = require('../models/route.model');

/* ====== TUYẾN ĐƯỜNG ====== */

exports.getAllRoutes = (callback) => {
  routeModel.getAllRoutes(callback);
};

exports.getRouteById = (MaTD, callback) => {
  routeModel.getRouteById(MaTD, callback);
};

exports.getNextRouteCode = (callback) => {
  routeModel.getLastRouteCode((err, result) => {
    if (err) return callback(err);

    let newCode = "TD000001"; // Mã mặc định ban đầu
    if (result && result.length > 0 && result[0].MaTD) {
      const lastCode = result[0].MaTD; // ví dụ: TD000123
      const num = parseInt(lastCode.replace("TD", ""), 10) + 1;
      newCode = "TD" + num.toString().padStart(6, "0");
    }

    callback(null, newCode);
  });
};

exports.addRoute = (data, callback) => {
  if (!data.TenTD) return callback(new Error("Thiếu tên tuyến"), null);

  routeModel.addRoute({ MaTD: data.MaTD, TenTD: data.TenTD }, (err) => {
    if (err) return callback(err);

    // gán trạm
    routeModel.assignStationsToRoute(data.MaTD, data.stations, (err2) => {
      if (err2) return callback(err2);
      callback(null, { MaTD: data.MaTD });
    });
  });
};

exports.updateRoute = (MaTD, data, callback) => {
  if (!data.TenTD) return callback(new Error('Thiếu dữ liệu để cập nhật tuyến đường'), null);

  routeModel.updateRoute(MaTD, { TenTD: data.TenTD }, (err) => {
    if (err) return callback(err);

    routeModel.updateStationsForRoute(MaTD, data.stations || [], callback);
  });
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

exports.getNextStationCode = (callback) => {
  routeModel.getLastStationCode((err, result) => {
    if (err) return callback(err);

    let newCode = "TR000001"; // Mã mặc định ban đầu
    if (result && result.length > 0 && result[0].MaTram) {
      const lastCode = result[0].MaTram; // ví dụ: TR000123
      const num = parseInt(lastCode.replace("TR", ""), 10) + 1;
      newCode = "TR" + num.toString().padStart(6, "0");
    }

    callback(null, newCode);
  });
};

exports.addStation = (data, callback) => {
  if (!data.TenTram) {
    return callback(new Error('Thiếu thông tin tên trạm'), null);
  }
    routeModel.addStation(data, (err2) => {
      if (err2) return callback(err2);
      callback(null);
    });
};


exports.updateStation = (MaTram, data, callback) => {
  if (!data.TenTram) {
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

exports.getNextBusCode = (callback) => {
  routeModel.getLastBusCode((err, result) => {
    if (err) return callback(err);

    let newCode = "BUS01"; // mặc định
    if (result && result.length > 0 && result[0].SoXeBuyt) {
      const lastCode = result[0].SoXeBuyt; // ví dụ BUS03
      const num = parseInt(lastCode.replace("BUS", ""), 10) + 1;
      newCode = "BUS" + num.toString().padStart(2, "0");
    }

    callback(null, newCode);
  });
};


exports.addBus = (data, callback) => {
  if (!data.BienSoXe || !data.SucChua) {
    return callback(new Error('Thiếu thông tin xe buýt cần thiết'), null);
  }
    routeModel.addBus(data, (err2) => {
      if (err2) return callback(err2);
      callback(null);
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
