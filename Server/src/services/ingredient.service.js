const ingredientModel = require('../models/ingredient.model');

exports.getAllIngredients = (callback) => {
  ingredientModel.getAllIngredients(callback)
};
