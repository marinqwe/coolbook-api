const Joi = require("joi");

function registerValidation(formData) {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required()
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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
