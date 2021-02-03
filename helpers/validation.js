const Joi = require('joi');

const nameSchema = Joi.string().min(2).required();
const emailSchema = Joi.string().required().email();
const passwordSchema = Joi.string().min(6).required();
const dateOfBirthSchema = Joi.date().greater('1-1-1900').less('12-31-2020');
const imageSchema = Joi.any();

exports.registerValidation = function registerValidation(formData) {
  const schema = Joi.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    userImg: imageSchema,
    dateOfBirth: dateOfBirthSchema,
  });
  return schema.validate(formData);
};

exports.updateProfileValidation = function updateProfileValidation(formData) {
  const schema = Joi.object({
    name: nameSchema,
    userImg: imageSchema,
    dateOfBirth: dateOfBirthSchema,
  });
  return schema.validate(formData);
};

exports.loginValidation = function loginValidation(formData) {
  const schema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
  });
  return schema.validate(formData);
};

exports.postValidation = function postValidation(formData) {
  const schema = Joi.object({
    title: nameSchema,
    content: Joi.string().required(),
  });
  return schema.validate(formData);
};

exports.commentValidation = function commentValidation(formData) {
  const schema = Joi.object({
    content: Joi.string().min(1).required(),
  });
  return schema.validate(formData);
};
