import Joi from "joi";

// Validation schema for registering an author
export const registerValidator = Joi.object().keys({
  AuthorName: Joi.string().lowercase().required(),
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(6).max(15).required(),
  phoneNumber: Joi.string().required(),
});

// Validation schema for logging in
export const loginValidator = Joi.object().keys({
  email: Joi.string().lowercase().required(),
  password: Joi.string().min(6).max(15).required(),
});
