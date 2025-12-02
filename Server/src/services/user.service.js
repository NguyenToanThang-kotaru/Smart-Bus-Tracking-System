const userModel = require('../models/user.model');

exports.getAllUsers = (callback) => {
  userModel.getAllUsers(callback);
};

exports.createUser = (data, callback) => {
  userModel.createUser(data, callback);
};

exports.Userlogin = (username, password, callback) => {
  var regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if(!regexUsername.test(username)) {
    return callback('Invalid username format');
  }
  // if(!regexPassword.test(password)) {
  //   return callback('Password must be at least 6 characters long and contain letters and numbers');
  // }

  if(!username || !password) {
    return callback('Username and password are required');
  }
  if(password.length < 6) {
    return callback('Password must be at least 6 characters long');
  }
  
  userModel.Userlogin(username, password, callback);
}

exports.Administratorlogin = (username, password, callback) => {
  var regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
  if(!regexUsername.test(username)) {
    return callback('Invalid username format');
  }
  // if(!regexPassword.test(password)) {
  //   return callback('Password must be at least 6 characters long and contain letters and numbers');
  // }

  if(!username || !password) {
    return callback('Username and password are required');
  }
  if(password.length < 6) {
    return callback('Password must be at least 6 characters long');
  }
  
  userModel.Administratorlogin(username, password, callback);
}

/* ===================== PHỤ HUYNH ===================== */

exports.getAllParents = (callback) => {
  
  userModel.getAllParents(callback);
};

exports.getParentById = (TenDangNhap, callback) => {
  userModel.getParentById(TenDangNhap, callback);
};

exports.getNextParentId = (callback) => {
  userModel.getLastParentId((err, result) => {
    if (err) return callback(err);

    const lastId = result && result[0] ? result[0].TenDangNhap : null;

    let newId = "PH000001";

    if (lastId) {
      const num = parseInt(lastId.replace("PH", "")) + 1;
      newId = "PH" + num.toString().padStart(6, "0");
    }

    callback(null, newId);
  });
};

// parent.service.js

exports.addParent = (data, callback) => {
  if (!data.TenDangNhap) return callback(new Error("Thiếu tên đăng nhập phụ huynh"), null);
  if (!data.TenPH) return callback(new Error("Thiếu tên phụ huynh"), null);

  // Thêm phụ huynh vào bảng phuhuynh
  userModel.addParent({
    TenDangNhap: data.TenDangNhap,
    TenPH: data.TenPH,
    MatKhau: data.MatKhau,
    SdtPH: data.SdtPH
  }, (err) => {
    if (err) return callback(err);

    // Gán các học sinh được chọn
    userModel.assignStudentsToParent(data.TenDangNhap, data.students || [], (err2) => {
      if (err2) return callback(err2);
      callback(null, { TenDangNhap: data.TenDangNhap });
    });
  });
};

exports.updateParent = (TenDangNhap, data, callback) => {
  if (!data.TenPH) return callback(new Error("Thiếu dữ liệu để cập nhật phụ huynh"), null);

  userModel.updateParent(TenDangNhap, {TenPH: data.TenPH, MatKhau: data.MatKhau, SdtPH: data.SdtPH}, (err) => {
    if (err) return callback(err);

    userModel.updateStudentsForParent(TenDangNhap, data.students || [], callback);
  });
};

exports.deleteParent = (TenDangNhap, callback) => {
  userModel.deleteParent(TenDangNhap, callback);
};



/* ===================== QUẢN LÝ TÀI XẾ ===================== */

exports.getAllBusManagers = (callback) => {
  userModel.getAllBusManagers(callback);
};

exports.getBusManagerById = (MaND, callback) => {
  userModel.getBusManagerById(MaND, callback);
};

exports.getNextBusManagerId = (callback) => {
  userModel.getLastBusManagerId((err, result) => {
    if (err) return callback(err);

    let lastId = result && result[0] ? result[0].MaND : null;

    let newId = "ND000001";
    if (lastId) {
      const num = parseInt(lastId.replace("ND", "")) + 1;
      newId = "ND" + num.toString().padStart(6, "0");
    }

    callback(null, newId);
  });
};

exports.addBusManager = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau)
    return callback(new Error("Thiếu dữ liệu quản lý tài xế"));

  userModel.getLastBusManagerId((err, result) => {
    if (err) return callback(err);

    let newId = "ND000001";
    if (result && result[0]?.MaND) {
      const num = parseInt(result[0].MaND.replace("ND", "")) + 1;
      newId = "ND" + num.toString().padStart(6, "0");
    }

    const managerObj = {
      MaND: newId,
      MaVT: "VT000002",
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau,
    };

    userModel.addBusManager(managerObj, (err2) => {
      if (err2) return callback(err2);
      callback(null, { message: "Thêm Quản lý tài xế thành công" });
    });
  });
};

exports.updateBusManager = (MaND, data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau)
    return callback(new Error("Thiếu dữ liệu cập nhật"));

  userModel.updateBusManager(MaND, data, callback);
};

exports.deleteBusManager = (MaND, callback) => {
  userModel.deleteBusManager(MaND, callback);
};



/* ===================== QUẢN TRỊ VIÊN ===================== */

exports.getAllAdministrators = (callback) => {
  userModel.getAllAdministrators(callback);
};

exports.getAdministratorById = (MaND, callback) => {
  userModel.getAdministratorById(MaND, callback);
};

exports.getNextAdministratorId = (callback) => {
  userModel.getLastAdministratorId((err, result) => {
    if (err) return callback(err);

    let lastId = result && result[0] ? result[0].MaND : null;

    let newId = "ND000001";
    if (lastId) {
      const num = parseInt(lastId.replace("ND", "")) + 1;
      newId = "ND" + num.toString().padStart(6, "0");
    }

    callback(null, newId);
  });
};

exports.addAdministrator = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau)
    return callback(new Error("Thiếu dữ liệu quản trị viên"));

  userModel.getLastAdministratorId((err, result) => {
    if (err) return callback(err);

    let newId = "ND000001";
    if (result && result[0]?.MaND) {
      const num = parseInt(result[0].MaND.replace("ND", "")) + 1;
      newId = "ND" + num.toString().padStart(6, "0");
    }

    const adminObj = {
      MaND: newId,
      MaVT: "VT000001",
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau,
    };

    userModel.addAdministrator(adminObj, (err2) => {
      if (err2) return callback(err2);
      callback(null, { message: "Thêm Quản trị viên thành công" });
    });
  });
};

exports.updateAdministrator = (MaND, data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau)
    return callback(new Error("Thiếu dữ liệu cập nhật"));

  userModel.updateAdministrator(MaND, data, callback);
};

exports.deleteAdministrator = (MaND, callback) => {
  userModel.deleteAdministrator(MaND, callback);
};



/* ===================== TÀI XẾ ===================== */

exports.getAllDrivers = (callback) => {
  userModel.getAllDrivers(callback);
};

exports.getDriverById = (MaTX, callback) => {
  userModel.getDriverById(MaTX, callback);
};

exports.getNextDriverId = (callback) => {
  userModel.getLastDriverId((err, result) => {
    if (err) return callback(err);

    let lastId = result && result[0] ? result[0].MaND : null;

    let newId = "ND000001";
    if (lastId) {
      const num = parseInt(lastId.replace("ND", "")) + 1;
      newId = "ND" + num.toString().padStart(6, "0");
    }

    callback(null, newId);
  });
};

exports.addDriver = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau ||
      !data.SoCccd || !data.SdtTX || !data.BacBangLai)
    return callback(new Error("Thiếu thông tin tài xế"));

  // Tạo tài khoản ND trước
  userModel.getLastDriverId((err, resultND) => {
    if (err) return callback(err);

    let newMaND = "ND000001";
    if (resultND && resultND[0]?.MaND) {
      const num = parseInt(resultND[0].MaND.replace("ND", "")) + 1;
      newMaND = "ND" + num.toString().padStart(6, "0");
    }

    const accountObj = {
      MaND: newMaND,
      MaVT: "VT000003",
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau
    };

    userModel.addDriverAccount(accountObj, (err2) => {
      if (err2) return callback(err2);
      const driverInfo = {
        MaTX: newMaND,
        SoCccd: data.SoCccd,
        SdtTX: data.SdtTX,
        BacBangLai: data.BacBangLai
      };

      userModel.addDriverInfo(driverInfo, (err4) => {
        if (err4) return callback(err4);

        callback(null, { message: "Thêm tài xế thành công" });
      });
    });
  });
};


exports.updateDriver = (MaTX, data, callback) => {
  if (!data.SoCccd || !data.SdtTX || !data.BacBangLai)
    return callback(new Error("Thiếu dữ liệu cập nhật"));

  userModel.updateDriver(MaTX, data, callback);
};

exports.deleteDriver = (MaTX, callback) => {
  userModel.deleteDriver(MaTX, callback);
};
