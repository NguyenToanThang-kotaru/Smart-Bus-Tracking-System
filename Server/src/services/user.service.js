const userModel = require('../models/user.model');

exports.getAllUsers = (callback) => {
  userModel.getAllUsers(callback);
};

exports.createUser = (data, callback) => {
  userModel.createUser(data, callback);
};

exports.login = (username, password, callback) => {
  var regexUsername = /^[a-zA-Z0-9_]{3,30}$/;
  var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if(!regexUsername.test(username)) {
    return callback('Invalid username format');
  }
  if(!regexPassword.test(password)) {
    return callback('Password must be at least 6 characters long and contain letters and numbers');
  }

  if(!username || !password) {
    return callback('Username and password are required');
  }
  if(password.length < 6) {
    return callback('Password must be at least 6 characters long');
  }
  
  userModel.login(username, password, callback);
}
