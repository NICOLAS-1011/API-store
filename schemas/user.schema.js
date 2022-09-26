const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(35);
const email = Joi.string().min(10).max(35);
const password = Joi.string().min(8).max(25).pattern(new RegExp('^[a-zA-Z0-9]'));

//.number()

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema,  getUserSchema}
