const roleModel = require('../models/role.model');

exports.getAllRoles = (callback) => {
  roleModel.getAllRoles(callback);
};

exports.getRoleById = (id, callback) => {
  roleModel.getRoleById(id, callback);
};

exports.getNextRoleId = (callback) => {
  roleModel.getLastRoleId((err, lastId) => {
    if (err) return callback(err);

    let newId = "VT00001";
    if (lastId) {
      const num = parseInt(lastId.replace("VT", "")) + 1;
      newId = "VT" + num.toString().padStart(5, "0");
    }
    callback(null, newId);
  });
};

exports.addRole = (data, callback) => {
  const { MaVT, TenVT } = data;

  // Validation: không để trống
  if (!TenVT) {
    return callback({ message: "Tên vai trò không được để trống" });
  }

  roleModel.addRole({ MaVT, TenVT }, (err, result) => {
    if (err) return callback(err);
    callback(null, {
      success: true,
      message: "Thêm vai trò thành công",
      data: { MaVT, TenVT }
    });
  });
};

exports.updateRole = (id, data, callback) => {
  const { TenVT } = data;

  // Validation: không để trống
  if (!TenVT) {
    return callback({ message: "Tên vai trò không được để trống" });
  }

  roleModel.updateRole(id, { TenVT }, (err, result) => {
    if (err) return callback(err);
    if (result.affectedRows === 0) {
      return callback(null, null); // Không tìm thấy vai trò
    }
    callback(null, {
      success: true,
      message: "Cập nhật vai trò thành công",
      data: { MaVT: id, TenVT }
    });
  });
};

exports.deleteRole = (id, callback) => {
  // Xóa mềm -> cập nhật IsDeleted = 1
  roleModel.deleteRole(id, (err, result) => {
    if (err) return callback(err);
    if (result.affectedRows === 0) {
      return callback(null, null); // Không tìm thấy
    }
    callback(null, {
      success: true,
      message: "Xóa vai trò thành công"
    });
  });
};
