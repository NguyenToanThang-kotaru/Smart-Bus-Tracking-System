const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authenticateToken = require('../middleware/authMiddleware');
const e = require('express');

// Đếm sản phẩm bán chạy nhất
router.get('/count', authenticateToken.authenticateToken, productController.countProduct);

// GET /api/product/nextid (lấy mã tiếp theo)
router.get('/nextid', authenticateToken.authenticateToken, productController.getNextProductId);

// GET /api/product/search?keyword=abc (tìm kiếm)
router.get('/search', authenticateToken.authenticateToken, productController.searchProduct);

// GET /api/product (lấy tất cả)
router.get('/', authenticateToken.authenticateToken, productController.getAllProducts);

// PUT /api/product/update/:id (cập nhật)
router.put('/update/:id', authenticateToken.authenticateToken, productController.updateProduct);

// PUT /api/product/delete/:id (xóa)
router.put('/delete/:id', authenticateToken.authenticateToken, productController.deleteProduct);

// GET /api/product/:id (lấy theo id)
router.get('/:id', authenticateToken.authenticateToken, productController.getProductById);

// POST /api/product (thêm mới)
router.post('/', authenticateToken.authenticateToken, productController.addProduct);

exports = module.exports = router;