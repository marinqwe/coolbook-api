const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("./helpers/errorHandler");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./services/passport");
const authConfig = require("./helpers/authConfig");
require("dotenv").config();
const router = require("./routes/index");

const app = express();

app.use(logger("dev"));

app.use(cookieParser(authConfig.jwt.secret));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passportConfig(passport);

app.use("/", router);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Server running at ${PORT}`);
});
