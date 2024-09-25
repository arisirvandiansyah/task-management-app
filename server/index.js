const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/task", require("./routes/task"));
app.use("/api/user", require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
