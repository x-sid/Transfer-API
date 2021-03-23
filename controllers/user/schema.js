const Joi = require("@hapi/joi");

module.exports = {
  signup: Joi.object().keys({
    firstName: Joi.string().required().min(1).max(15),
    lastName: Joi.string().required().min(1).max(15),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().integer().required(),
    transactionPin: Joi.number().integer().required().min(4),
    password: Joi.string().min(6).max(15).required(),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Passwords do not match" }),
  }),

  login: Joi.object().keys({
    email: Joi.string().required().min(1).max(15),
    password: Joi.string().required(),
  }),
};
