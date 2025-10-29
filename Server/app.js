require('dotenv').config();
const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// routes
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const mapRoutes = require("./src/routes/route.routes");
const tripRoutes = require("./src/routes/trip.routes");

// socket
const socketHandler = require("./src/socket");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, cb) => cb(null, origin || "*"),
  credentials: true,
}));

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/routes', mapRoutes);
app.use('/api/trips', tripRoutes);

// tạo HTTP server từ Express app
const server = http.createServer(app);

// tạo Socket.IO server và gắn vào HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // hoặc đặt origin cụ thể
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// gọi socket handler, truyền io vào
socketHandler(io);

// khởi động server
const PORT = 3700;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server đang chạy ở http://0.0.0.0:${PORT}`);
});
