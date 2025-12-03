const validate = require('./validation');
const studentModel = require('../models/student.model');

exports.getAllStudents = (callback) => {
  studentModel.getAllStudents(callback);
}

exports.getStudentById = (id, callback) => {
  studentModel.getStudentById(id, callback);
}

exports.addStudent = (data, callback) => {
  if (!data.MaHS || !data.TenHS || !data.Lop) {
    return callback(new Error('Thiếu dữ liệu cần thiết'), null);
  }
  if (validate.validateName(data.TenHS)) {
    return callback(new Error('Tên học sinh chỉ được chứa chữ cái'), null);
  }
  if (validate.validateClass(data.Lop)) {
    return callback(new Error('Lớp không hợp lệ'), null);
  }

  studentModel.addStudent(data, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  })
}

exports.updateStudent = (id, data, callback) => {
  if (!data.TenHS || !data.Lop) {
    return callback(new Error('Thiếu dữ liệu cần thiết'), null);
  }
  if (validate.validateName(data.TenHS)) {
    return callback(new Error('Tên học sinh chỉ được chứa chữ cái'), null);
  }
  if (validate.validateClass(data.Lop)) {
    return callback(new Error('Lớp không hợp lệ'), null);
  }

  studentModel.updateStudent(id, data, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  })
}

exports.deleteStudent = (id, callback) => {
  studentModel.deleteStudent(id, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getNextStudentId = (callback) => {
  studentModel.getLastStudentId((err, lastId) => {
    if (err) return callback(err);

    let newId = "HS000001";
    if (lastId) {
      const num = parseInt(lastId.replace("HS", "")) + 1;
      newId = "HS" + num.toString().padStart(6, "0"); 
    }
    callback(null, newId);
  });
};

exports.searchStudent = (keyword, callback) => {
  studentModel.searchStudent(keyword, callback);
};

