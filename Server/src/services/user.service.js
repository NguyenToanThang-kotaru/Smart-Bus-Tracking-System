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

exports.Adminlogin = (username, password, callback) => {
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
  
  userModel.Adminlogin(username, password, callback);
}

/* ====== PHỤ HUYNH ====== */

exports.getAllParents = (callback) => {
  userModel.getAllParents(callback);
};

exports.getParentById = (TenDangNhap, callback) => {
  userModel.getParentById(TenDangNhap, callback);
};

exports.addParent = (data, callback) => {
  if (!data.MatKhau || !data.TenPH || !data.SdtPH) {
    return callback(new Error('Thiếu thông tin phụ huynh cần thiết'), null);
  }

  userModel.getLastParentCode((err, result) => {
    if (err) return callback(err);

    let newCode = "PH000001";
    if (result && result.length > 0 && result[0].TenDangNhap) {
      const num = parseInt(result[0].TenDangNhap.replace("PH", ""), 10) + 1;
      newCode = "PH" + num.toString().padStart(6, "0");
    }

    const newParent = {
      TenDangNhap: newCode,
      SdtPH: data.SdtPH,
      TenPH: data.TenPH,
      MatKhau: data.MatKhau,
    };

    userModel.addParent(newParent, (err) => {
      if (err) return callback(err);
      callback(null, { message: `Thêm phụ huynh thành công` });
    });
  });
};

exports.updateParent = (TenDangNhap, data, callback) => {
  if (!data.TenPH || !data.MatKhau || !data.SdtPH) {
    return callback(new Error('Thiếu dữ liệu để cập nhật phụ huynh'), null);
  }
  userModel.updateParent(TenDangNhap, data, callback);
};

exports.deleteParent = (TenDangNhap, callback) => {
  userModel.deleteParent(TenDangNhap, callback);
};

/* ====== QUẢN LÝ TÀI XẾ ====== */

exports.getAllManagerDrivers = (callback) => {
  userModel.getAllManagerDrivers(callback);
};

exports.getManagerDriverById = (MaND, callback) => {
  userModel.getManagerDriverById(MaND, callback);
};

exports.addManagerDriver = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau) {
    return callback(new Error('Thiếu thông tin Quản lý tài xế cần thiết'), null);
  }

  userModel.getLastManagerDriverCode((err, result) => {
    if (err) return callback(err);

    let newCode = "ND000001";
    if (result && result.length > 0 && result[0].MaND) {
      const num = parseInt(result[0].MaND.replace("ND", ""), 10) + 1;
      newCode = "ND" + num.toString().padStart(6, "0");
    }

    const newManager = {
      MaND: newCode,
      MaVT: 'VT000002',
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau,
    };

    userModel.addManagerDriver(newManager, (err) => {
      if (err) return callback(err);
      callback(null, { message: `Thêm Quản lý tài xế thành công` });
    });
  });
};

exports.updateManagerDriver = (MaND, data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau) {
    return callback(new Error('Thiếu dữ liệu để cập nhật Quản lý tài xế'), null);
  }
  userModel.updateManagerDriver(MaND, data, callback);
};

exports.deleteManagerDriver = (MaND, callback) => {
  userModel.deleteManagerDriver(MaND, callback);
};

/* ====== QUẢN TRỊ VIÊN ====== */

exports.getAllAdmins = (callback) => {
  userModel.getAllAdmins(callback);
};

exports.getAdminById = (MaND, callback) => {
  userModel.getAdminById(MaND, callback);
};

exports.addAdmin = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau) {
    return callback(new Error('Thiếu thông tin Quản trị viên cần thiết'), null);
  }

  userModel.getLastAdminCode((err, result) => {
    if (err) return callback(err);

    let newCode = "ND000001";
    if (result && result.length > 0 && result[0].MaND) {
      const num = parseInt(result[0].MaND.replace("ND", ""), 10) + 1;
      newCode = "ND" + num.toString().padStart(6, "0");
    }

    const newAdmin = {
      MaND: newCode,
      MaVT: 'VT000001',
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau,
    };

    userModel.addAdmin(newAdmin, (err) => {
      if (err) return callback(err);
      callback(null, { message: `Thêm Quản trị viên thành công` });
    });
  });
};

exports.updateAdmin = (MaND, data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau) {
    return callback(new Error('Thiếu dữ liệu để cập nhật Quản trị viên'), null);
  }
  userModel.updateAdmin(MaND, data, callback);
};

exports.deleteAdmin = (MaND, callback) => {
  userModel.deleteAdmin(MaND, (err) => {
    if (err) return callback(err);
    callback(null, { message: 'Xóa Quản trị viên thành công' });
  });
};


/* ====== TÀI XẾ ====== */

exports.getAllDrivers = (callback) => {
  userModel.getAllDrivers(callback);
};

exports.getDriverById = (MaTX, callback) => {
  userModel.getDriverById(MaTX, callback);
};

exports.addDriver = (data, callback) => {
  if (!data.TenND || !data.TenDangNhap || !data.MatKhau ||
      !data.SoCccd || !data.SdtTX || !data.BacBangLai) {
    return callback(new Error('Thiếu thông tin tài xế'), null);
  }

  userModel.getLastDriverAccountCode((err, resultND) => {
    if (err) return callback(err);

    let newMaND = "ND000001";
    if (resultND && resultND.length > 0 && resultND[0].MaND) {
      const numND = parseInt(resultND[0].MaND.replace("ND", ""), 10) + 1;
      newMaND = "ND" + numND.toString().padStart(6, "0");
    }

    const driverAccount = {
      MaND: newMaND,
      MaVT: 'VT000003', 
      TenND: data.TenND,
      TenDangNhap: data.TenDangNhap,
      MatKhau: data.MatKhau,
    };

    userModel.addDriverAccount(driverAccount, (err) => {
      if (err) return callback(err);

      userModel.getLastDriverInfoCode((err2, resultTX) => {
        if (err2) return callback(err2);

        let newMaTX = "TX000001";
        if (resultTX && resultTX.length > 0 && resultTX[0].MaTX) {
          const numTX = parseInt(resultTX[0].MaTX.replace("TX", ""), 10) + 1;
          newMaTX = "TX" + numTX.toString().padStart(6, "0");
        }

        const driverInfo = {
          MaTX: newMaTX,
          SoCccd: data.SoCccd,
          SdtTX: data.SdtTX,
          BacBangLai: data.BacBangLai
        };

        userModel.addDriverInfo(driverInfo, (err3) => {
          if (err3) return callback(err3);

          callback(null, {
            message: "Thêm tài xế thành công",
          });
        });
      });
    });
  });
};


exports.updateDriver = (MaTX, data, callback) => {
  if (!data.SoCccd || !data.SdtTX || !data.BacBangLai) {
    return callback(new Error('Thiếu dữ liệu để cập nhật tài xế'), null);
  }
  userModel.updateDriver(MaTX, data, callback);
};

exports.deleteDriver = (MaTX, MaND, callback) => {
  userModel.deleteDriver(MaTX, MaND, (err) => {
    if (err) return callback(err);
    callback(null, { message: 'Xóa tài xế thành công' });
  });
};