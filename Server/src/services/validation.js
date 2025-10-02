function validateName(name) {
  const nameRegex = /^[\p{L}\s]+$/u;   // Chỉ cho phép chữ + khoảng trắng (có dấu tiếng Việt)
  if (!nameRegex.test(name)) {
    return "Tên nhân viên chỉ được chứa chữ cái và khoảng trắng";
  }
  if (name.length > 100) {
    return "Tên nhân viên không được vượt quá 100 ký tự";
  }
  return null;
}

// Validate số điện thoại
function validatePhone(phone) {
  const phoneRegex = /^0\d{9}$/;       // 10 số, bắt đầu bằng 0
  if (!phoneRegex.test(phone)) {
    return "Số điện thoại không hợp lệ";
  }
  return null;
}

// Validate địa chỉ
function validateAddress(address) {
  if (address.length > 200) {
    return "Địa chỉ không được vượt quá 200 ký tự";
  }
  return null;
}

// Validate giá tiền
function validatePrice(price) {
  if (isNaN(price) || price <= 0) {
    return "Giá sản phẩm phải là số dương";
  }
  return null;
}

module.exports = {
  validateName,
  validatePhone,
  validateAddress,
  validatePrice
};