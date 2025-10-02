const {validatePrice} = require('./validation');
const productModel = require('../models/product.model');

exports.countProduct = (req, res) => {
    productModel.countProduct((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi server', error: err });
        }
        res.json(results);
    });
};

exports.getAllProducts = (callback) => {
  productModel.getAllProducts(callback)
};

exports.getProductById = (id, callback) => {
  productModel.getProductById(id, callback);
};

exports.searchProduct = (keyword, callback) => {
  productModel.searchProduct(keyword, callback);
};


exports.getNextProductId = (callback) => {
  productModel.getLastProductId((err, lastId) => {
    if (err) return callback(err);

    let newId = "SP00001";
    if (lastId) {
      const num = parseInt(lastId.replace("SP", "")) + 1;
      newId = "SP" + num.toString().padStart(5, "0");
    }
    callback(null, newId);
  });
};

exports.addProduct = (data, callback) => {
  const { MaSP, TenSP, GiaSP, MoTaSP, AnhSP } = data;

  // Kiểm tra dữ liệu trống
  // if (!TenSP || !MoTaSP || !GiaSP || !AnhSP) {
  //   return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  // }
  if(!TenSP)
    return callback({ status: 400, message: "Vui lòng nhập tên sản phẩm" });
  if(!MoTaSP)
    return callback({ status: 400, message: "Vui lòng nhập mô tả sản phẩm" }); 
  if(!GiaSP)
    return callback({ status: 400, message: "Vui lòng nhập giá sản phẩm" });
  if(!AnhSP)
    return callback({ status: 400, message: "Vui lòng chọn ảnh sản phẩm" });

  // Validate dữ liệu
  const error = validatePrice(GiaSP);
  if (error) 
    return callback({ status: 400, message: error });
  if (TenSP.length > 50) 
    return callback({ status: 400, message: "Tên sản phẩm không quá 50 kí tự" });
  if (MoTaSP.length > 255) 
    return callback({ status: 400, message: "Mô tả sản phẩm không quá 255 kí tự" });
  if (AnhSP.length > 255) 
    return callback({ status: 400, message: "Tên ảnh sản phẩm không quá 255 kí tự" });

  const productData = { MaSP, TenSP, MoTaSP, GiaSP, AnhSP };
  productModel.addProduct(productData, (err, result) => {
    if (err) return callback({ status: 500, message: err.message });
    callback(null, productData);
  });

};


exports.updateProduct = (id, data, callback) => {
  const { TenSP, GiaSP, MoTaSP, AnhSP } = data;

  // Kiểm tra dữ liệu trống
  if (!TenSP || !MoTaSP || !GiaSP || !AnhSP) {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  // Validate dữ liệu
  const error = validatePrice(GiaSP);
  if (error) 
    return callback({ status: 400, message: error });
  if (TenSP.length > 50) 
    return callback({ status: 400, message: "Tên sản phẩm không quá 50 kí tự" });
  if (MoTaSP.length > 255) 
    return callback({ status: 400, message: "Mô tả sản phẩm không quá 255 kí tự" });
  if (AnhSP.length > 255) 
    return callback({ status: 400, message: "Tên ảnh sản phẩm không quá 255 kí tự" });

  //  Dữ liệu update
    const productData = { TenSP, GiaSP, MoTaSP, AnhSP };
    productModel.updateProduct(id, productData, (err, result) => {
      if (err) return callback({ status: 500, message: err.message });
      if (result.affectedRows === 0) {
        return callback({ status: 404, message: "Không tìm thấy sản phẩm" });
      }
      callback(null, {
        status: 200,
        message: "Cập nhật sản phẩm thành công",
        data: { MaSP: id, ...productData }
      });
    });
};

exports.deleteProduct = (id, callback) => {
  // Xóa mềm -> cập nhật IsDeleted = 1
  productModel.deleteProduct(id, (err, result) => {
    if (err) return callback(err);
    if (result.affectedRows === 0) {
      return callback(null, null); // Không tìm thấy
    }
    callback(null, {
      success: true,
      message: "Xóa sản phẩm thành công"
    });
  });
};