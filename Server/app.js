require('dotenv').config();


const cookieParser = require("cookie-parser");
const express = require('express');
const cors = require('cors'); // 👈 thêm
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.routes');
const authRoutes = require('./src/routes/auth.routes');
const mapRoutes = require("./src/routes/route.routes");
const studentRoutes = require('./src/routes/student.routes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, cb) => cb(null, origin||"*"), // trả lại origin thực
  credentials: true,
}));
// app.use(cors())
// routes
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/routes', mapRoutes);

app.use('/api/students', studentRoutes);

// start server
const PORT = 3700;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy ở http://0.0.0.0:3700`);
});
