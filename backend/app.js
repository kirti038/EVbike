const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require('cookie-parser');
const indexRouter = require("./routes/indexRoute");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
var cors = require('cors');

app.use(cors());
require("./config/dbconection").dbconnection();
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
