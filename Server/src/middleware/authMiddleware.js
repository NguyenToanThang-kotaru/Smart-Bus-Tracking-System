const jwt = require("jsonwebtoken");
require('dotenv').config();
// Middleware xác thực token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Thiếu token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Token lỗi:", token);
      console.error("Chi tiết lỗi:", err.name, err.message);
      return res.status(403).json({ message: "Token không hợp lệ", error: err.message });
    }
    req.user = user;
    next();
  });
}

// Middleware phân quyền theo role
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRoles };
