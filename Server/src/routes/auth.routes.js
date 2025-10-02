const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// POST /api/auth/refresh
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken; // lấy từ cookie
  if (!refreshToken) {
    return res.status(401).json({ message: "Khong co token" });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      const newAccessToken = jwt.sign(
        { username: user.username, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken: newAccessToken });
    }
  );
});

module.exports = router;