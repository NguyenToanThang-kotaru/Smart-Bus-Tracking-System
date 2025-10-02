const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const busRoute = require("./routes/busRoute");
// const chatRoute = require("./routes/chatRoute");

const busSocket = require("./sockets/busSocket");
// const chatSocket = require("./sockets/chatSocket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/busroute", busRoute);
// app.use("/api/chat", chatRoute);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.IO namespace hoặc logic riêng
busSocket(io);   // truyền io vào để busSocket quản lý
// chatSocket(io);  // chatSocket cũng nhận io

server.listen(3001, () => console.log("Server running on 3001"));
