const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const errorHandler = require("./helpers/errorHandler");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./services/passport");
require("dotenv").config();

const app = express();

app.use(logger("dev"));

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
passportConfig(passport);

app.use("/", require("./routes/index"));
app.use("/api/user", require("./routes/user"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`Server running at ${PORT}`);
});
