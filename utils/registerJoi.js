const Joi = require("joi");

const indianMobile = Joi.extend((joi) => ({
  type: "indianMobile",
  base: joi.string(),
  messages: {
    "indianMobile.invalid": "{{#label}} must be a valid Indian mobile number",
  },
  validate(value, helpers) {
    const isValid = /^[0-9]{1,10}$/.test(value); // Jio mobile number pattern
    if (!isValid) {
      return { value, errors: helpers.error("indianMobile.invalid") };
    }
    return value;
  },
}));

const imageSchemaValidation = Joi.object({
  name: Joi.string().required(),
  size: Joi.number().integer().positive().required(),
  type: Joi.string().required(),
  url: Joi.string().uri().required()
});

const isUserRequestValid  = Joi.object({
  userName: Joi.string().min(6).max(20).required(),
  userEmail: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .lowercase()
    .required(),
  userPassword: Joi.string().min(6).max(20).required(),
  userNumber: Joi.string().length(10).required(), // Use length to specify exact length
  userImage: imageSchemaValidation,
});

module.exports = isUserRequestValid
