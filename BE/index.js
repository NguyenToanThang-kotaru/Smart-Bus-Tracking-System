const express = require("express");
const app = express();
const port = 3001;

const busRoute = require("./routes/busRoute");
const cors = require("cors");
app.use(cors());
app.use("/api/busroute", busRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
