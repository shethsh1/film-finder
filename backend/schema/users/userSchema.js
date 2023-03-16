const Joi = require('joi');

const UserSchema = {
  userInputSchema: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  userLoginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = UserSchema;
