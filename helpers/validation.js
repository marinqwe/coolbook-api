const Joi = require("joi");

function registerValidation(formData) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    userImg: Joi.any(),
  });
  return schema.validate(formData);
}

function updateProfileValidation(formData) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    userImg: Joi.any(),
  });
  return schema.validate(formData);
}

function loginValidation(formData) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(formData);
}

function postValidation(formData) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    content: Joi.string().required(),
  });
  return schema.validate(formData);
}

module.exports = {
  registerValidation,
  updateProfileValidation,
  loginValidation,
  postValidation,
};
