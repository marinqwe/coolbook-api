const { User } = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} = require('../helpers/validation');
const authConfig = require('../helpers/authConfig');

module.exports = {
  async register(req, res, next) {
    console.log(req.body);
    const { error, value } = registerValidation(req.body);
    if (error) return next(error.details[0].message);
    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (user) return next('Email already exists.');

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //create object
    let userToCreate = {
      ...req.body,
      password: hashedPass,
    };

    //Check if user uploaded an image and add it on the create object
    if (req.file) {
      userToCreate.userImg = req.file.path;
    }

    const newUser = await User.create(userToCreate);
    if (!newUser) return next('Register failed, please try again.');

    return res.status(201).send(newUser);
  },
  async login(req, res, next) {
    const { error, value } = loginValidation(req.body);
    if (error) return next(error.details[0].message);
    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) return next('Email not found.');

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return next('Invalid password.');

    jwt.sign(
      { email, role: user.role },
      authConfig.jwt.secret,
      function (err, token) {
        if (err) return next(err);
        res.cookie('jwt', token, authConfig.jwt.cookie);

        return res.json({ jwt: token, user });
      }
    );
  },
  async logout(req, res) {
    res.clearCookie('jwt');
    return res.status(200).send('Success');
  },
  async getUser(req, res) {
    if (req.user) {
      const user = await User.findOne({
        where: { email: req.user.email },
      });
      return res.send(user);
    }

    return res.json({ msg: 'Not logged in' });
  },
  async update(req, res, next) {
    const { error, value } = updateProfileValidation(req.body);
    if (error) return next(error.details[0].message);
    const { name, dateOfBirth } = value;
    const email = req.user.email;

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) return next('User not found.');

    //update object
    let fieldsToUpdate = {
      name,
      dateOfBirth,
    };

    //Check if user uploaded new image and add it to update object
    if (req.file) {
      fieldsToUpdate.userImg = req.file.path;
    }

    const updatedUser = await user.update(fieldsToUpdate, {
      where: {
        id: user.id,
      },
    });
    if (!updatedUser) return next('Update failed, please try again.');

    return res.status(200).send(updatedUser);
  },
};
