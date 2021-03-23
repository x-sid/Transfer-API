const Joi = require("@hapi/joi");

module.exports = {
  transfer: Joi.object().keys({
    recipientAccountNumber: Joi.number().integer().required().min(10),
    amount: Joi.number().integer().required().min(1),
    transactionPin: Joi.number().integer().required().min(4),
  }),
};
