const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");
const authConfig = require("../helpers/authConfig");

module.exports = {
  async register(req, res, next) {
    const { error, value } = registerValidation(req.body);
    if (error) return next(error.details[0].message);
    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (user) return next("Email already exists.");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hashedPass,
      userImg: req.file.path,
    });
    if (!newUser) return next("Register failed, please try again.");

    return res.status(201).send(newUser);
  },
  async login(req, res, next) {
    const { error, value } = loginValidation(req.body);
    if (error) return next(error.details[0].message);
    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) return next("Email not found.");

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return next("Invalid password.");

    jwt.sign({ email }, authConfig.jwt.secret, function (err, token) {
      if (err) return next(err);

      res.cookie("jwt", token, authConfig.jwt.cookie);

      return res.json({ jwt: token, user });
    });
  },
  async logout(req, res) {
    res.clearCookie("jwt");
    return res.status(200).send("Success");
  },
  async getUser(req, res) {
    if (req.user) {
      const user = await User.findOne({
        where: { email: req.user },
      });
      return res.send(user);
    }

    return res.json({ msg: "Not logged in" });
  },
};
