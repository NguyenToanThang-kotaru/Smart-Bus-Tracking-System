const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getAllUsers = (req, res) => {
  userService.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.Userlogin = (req, res) => {
  const { username, password } = req.body;

  userService.Userlogin(username, password, (err, user) => {
    if (err) {
      console.log(err)
      // err có thể là string (lỗi validate) hoặc object (lỗi DB)
      if (typeof err === "string") {
        return res.status(400).json({ error: err }); 
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

exports.Adminlogin = (req, res) => {
  const { username, password } = req.body;

  userService.Adminlogin(username, password, (err, user) => {
    if (err) {
      // err có thể là string (lỗi validate) hoặc object (lỗi DB)
      if (typeof err === "string") {
        return res.status(400).json({ error: err }); 
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

/* ========= PHỤ HUYNH ========= */

exports.getAllParents = (req, res) => {
  userService.getAllParents((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getParentById = (req, res) => {
  const { TenDangNhap } = req.params;
  userService.getParentById(TenDangNhap, (err, parent) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!parent || parent.length === 0)
      return res.status(404).json({ message: "Không tìm thấy phụ huynh" });
    res.status(200).json(parent[0]);
  });
};

exports.addParent = (req, res) => {
  const data = req.body;
  userService.addParent(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(201).json({ message: "Thêm phụ huynh thành công", result });
  });
};

exports.updateParent = (req, res) => {
  const { TenDangNhap } = req.params;
  const data = req.body;
  userService.updateParent(TenDangNhap, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(200).json({ message: "Cập nhật phụ huynh thành công", result });
  });
};

exports.deleteParent = (req, res) => {
  const { TenDangNhap } = req.params;
  userService.deleteParent(TenDangNhap, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.status(200).json({ message: "Xóa phụ huynh thành công", result });
  });
};

/* ========= QUẢN LÝ TÀI XẾ ========= */

exports.getAllManagerDrivers = (req, res) => {
  userService.getAllManagerDrivers((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getManagerDriverById = (req, res) => {
  const { MaND } = req.params;
  userService.getManagerDriverById(MaND, (err, manager) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!manager || manager.length === 0)
      return res.status(404).json({ message: "Không tìm thấy quản lý tài xế" });
    res.status(200).json(manager[0]);
  });
};

exports.addManagerDriver = (req, res) => {
  const data = req.body;
  userService.addManagerDriver(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(201).json({ message: "Thêm Quản lý tài xế thành công", result });
  });
};

exports.updateManagerDriver = (req, res) => {
  const { MaND } = req.params;
  const data = req.body;
  userService.updateManagerDriver(MaND, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(200).json({ message: "Cập nhật Quản lý tài xế thành công", result });
  });
};

exports.deleteManagerDriver = (req, res) => {
  const { MaND } = req.params;
  userService.deleteManagerDriver(MaND, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.status(200).json({ message: "Xóa Quản lý tài xế thành công", result });
  });
};

/* ========= QUẢN TRỊ VIÊN ========= */

exports.getAllAdmins = (req, res) => {
  userService.getAllAdmins((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getAdminById = (req, res) => {
  const { MaND } = req.params;
  userService.getAdminById(MaND, (err, admin) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!admin || admin.length === 0)
      return res.status(404).json({ message: "Không tìm thấy quản trị viên" });
    res.status(200).json(admin[0]);
  });
};

exports.addAdmin = (req, res) => {
  const data = req.body;
  userService.addAdmin(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(201).json({ message: "Thêm Quản trị viên thành công", result });
  });
};

exports.updateAdmin = (req, res) => {
  const { MaND } = req.params;
  const data = req.body;
  userService.updateAdmin(MaND, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message || err });
    res.status(200).json({ message: "Cập nhật Quản trị viên thành công", result });
  });
};

exports.deleteAdmin = (req, res) => {
  const { MaND } = req.params;
  userService.deleteAdmin(MaND, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.status(200).json({ message: "Xóa Quản trị viên thành công", result });
  });
};

/* ===================== TÀI XẾ ===================== */

exports.getAllDrivers = (req, res) => {
  userService.getAllDrivers((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getDriverById = (req, res) => {
  const MaTX = req.params.MaTX;

  userService.getDriverById(MaTX, (err, driver) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!driver || driver.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy tài xế" });
    }
    res.status(200).json(driver);
  });
};

exports.addDriver = (req, res) => {
  const data = req.body;

  userService.addDriver(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({
      message: "Thêm tài xế thành công",
      result
    });
  });
};

exports.updateDriver = (req, res) => {
  const MaTX = req.params.MaTX;
  const data = req.body;

  userService.updateDriver(MaTX, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json({ message: "Cập nhật tài xế thành công", result });
  });
};

exports.deleteDriver = (req, res) => {
  const MaTX = req.params.MaTX;
  const MaND = req.params.MaND;

  userService.deleteDriver(MaTX, MaND, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Xóa tài xế thành công", result });
  });
};