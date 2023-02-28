const Joi = require('joi');

const joiValidate = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

const validateSales = (param) => {
  const { error } = joiValidate.validate(param);
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: undefined, message: null };
};

module.exports = { validateSales };
