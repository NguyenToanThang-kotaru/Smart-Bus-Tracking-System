const db = require('../config/db');

exports.getAllIngredients = (callback) => {
  db.query('SELECT * FROM nguyenlieu', callback);
};