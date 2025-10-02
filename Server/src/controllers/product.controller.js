const productService = require("../services/product.service");

exports.countProduct = (req, res) => {
    productService.countProduct(req, res);
}

exports.getAllProducts = (req, res) => {
    productService.getAllProducts((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;

  productService.getProductById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(result);
  });
};

exports.searchProduct = (req, res) => {
  const keyword = req.query.keyword || "";
  productService.searchProduct(keyword, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getNextProductId = (req, res) => {
  productService.getNextProductId((err, nextId) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nextId });
  });
};

exports.addProduct = (req, res) => {
  const productData = req.body;

  productService.addProduct(productData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        // Validation lỗi → trả 200, success=false
        return res.json({ success: false, message: err.message });
      }
      // Lỗi khác vẫn throw status
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }
    res.status(201).json({ success: true, message: "Thêm sản phẩm thành công", product: result });
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const productData = req.body;

  productService.updateProduct(id, productData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        // Validation lỗi → trả 200, success=false
        return res.json({ success: false, message: err.message });
      }
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }

    res.status(200).json({ success: true, message: "Sửa sản phẩm thành công", product: result });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  productService.deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({ message: "Xóa sản phẩm thành công" });
  });
};