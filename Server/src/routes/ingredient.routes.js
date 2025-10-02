const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/ingredient/
router.get('/' ,authenticateToken.authenticateToken,ingredientController.getAllIngredient);

module.exports = router;