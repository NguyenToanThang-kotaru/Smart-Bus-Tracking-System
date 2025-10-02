const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getAllUsers = (req, res) => {
  userService.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  userService.login(username, password, (err, user) => {
    if (err) {
      // err có thể là string (lỗi validate) hoặc object (lỗi DB)
      if (typeof err === "string") {
        return res.status(400).json({ error: err }); // lỗi client (bad request)
      }
      return res.status(500).json({ error: "Internal server error" }); // lỗi hệ thống
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role }, // payload
      process.env.ACCESS_TOKEN_SECRET, // secret key
      { expiresIn: "30m" } // thời gian sống
    );

    const refreshToken = jwt.sign(
      { username: user.username, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15h" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true nếu dùng https
      sameSite: "lax",
      path: "/" // chỉ gửi khi call /refresh
    });

    res.json({ message: "Login successful", user, accessToken });
  });
};

exports.getUsers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  userService.getUsers(page, limit, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  userService.createUser(newUser, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User created!", id: result.insertId });
  });
};