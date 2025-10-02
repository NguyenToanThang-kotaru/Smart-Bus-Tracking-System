const ingredientService = require("../services/ingredient.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllIngredient = (req, res) => {
    ingredientService.getAllIngredients((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};