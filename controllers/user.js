const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "variables.env" });
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");

module.exports = {
  async register(req, res) {
    const { email, password } = req.body;

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).send("Email already exists.");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({ ...req.body, password: hashedPass });
    return res.status(201).send(newUser);
  },
  async login(req, res) {
    const { email, password } = req.body;

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("Email not found.");

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return res.status(400).send("Invalid password.");

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 18000000,
    });
    res.header("Bearer", token).send(token);
  },
  async testAuth(req, res) {
    return res.send(req.user);
  },
};
