import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
