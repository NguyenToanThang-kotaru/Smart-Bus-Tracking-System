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

  userService.Administratorlogin(username, password, (err, user) => {
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


/* ===================== PHỤ HUYNH ===================== */

exports.getAllParents = (req, res) => {
  userService.getAllParents((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getParentById = (req, res) => {
  const username = req.params.username;

  userService.getParentById(username, (err, parent) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!parent || parent.length === 0)
      return res.status(404).json({ message: "Không tìm thấy phụ huynh" });

    res.json(parent[0]);
  });
};

exports.addParent = (req, res) => {
  userService.addParent(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm phụ huynh thành công", result });
  });
};

exports.updateParent = (req, res) => {
  const username = req.params.username;

  userService.updateParent(username, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Cập nhật phụ huynh thành công", result });
  });
};

exports.deleteParent = (req, res) => {
  const username = req.params.username;

  userService.deleteParent(username, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa phụ huynh thành công", result });
  });
};

/* ===================== QUẢN LÝ XE BUÝT ===================== */

exports.getAllBusManagers = (req, res) => {
  userService.getAllBusManagers((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getBusManagerById = (req, res) => {
  const id = req.params.id;

  userService.getBusManagerById(id, (err, manager) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!manager || manager.length === 0)
      return res.status(404).json({ message: "Không tìm thấy quản lý xe buýt" });
    res.json(manager[0]);
  });
};

exports.addBusManager = (req, res) => {
  userService.addBusManager(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm Quản lý xe buýt thành công", result });
  });
};

exports.updateBusManager = (req, res) => {
  const id = req.params.id;

  userService.updateBusManager(id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Cập nhật Quản lý xe buýt thành công", result });
  });
};

exports.deleteBusManager = (req, res) => {
  const id = req.params.id;

  userService.deleteBusManager(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa Quản lý xe buýt thành công", result });
  });
};

/* ===================== QUẢN TRỊ VIÊN ===================== */

exports.getAllAdministrators = (req, res) => {
  userService.getAllAdministrators((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getAdministratorById = (req, res) => {
  const id = req.params.id;

  userService.getAdministratorById(id, (err, administrator) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!administrator || administrator.length === 0)
      return res.status(404).json({ message: "Không tìm thấy quản trị viên" });
    res.json(administrator[0]);
  });
};

exports.addAdministrator = (req, res) => {
  userService.addAdministrator(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm quản trị viên thành công", result });
  });
};

exports.updateAdministrator = (req, res) => {
  const id = req.params.id;

  userService.updateAdministrator(id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Cập nhật quản trị viên thành công", result });
  });
};

exports.deleteAdministrator = (req, res) => {
  const id = req.params.id;

  userService.deleteAdministrator(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa quản trị viên thành công", result });
  });
};

/* ===================== TÀI XẾ ===================== */

exports.getAllDrivers = (req, res) => {
  userService.getAllDrivers((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

exports.getDriverById = (req, res) => {
  const id = req.params.id;

  userService.getDriverById(id, (err, driver) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!driver || driver.length === 0)
      return res.status(404).json({ message: "Không tìm thấy tài xế" });
    res.json(driver[0]);
  });
};

exports.addDriver = (req, res) => {
  userService.addDriver(req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm tài xế thành công", result });
  });
};

exports.updateDriver = (req, res) => {
  const id = req.params.id;

  userService.updateDriver(id, req.body, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Cập nhật tài xế thành công", result });
  });
};

exports.deleteDriver = (req, res) => {
  const id = req.params.id;

  userService.deleteDriver(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa tài xế thành công", result });
  });
};