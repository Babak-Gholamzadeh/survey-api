const { User } = require('../models');
const db = require('../db');
const { AppError } = require('../utils');

const register = async ({ email, password }) => {
  email = email.toLowerCase();
  const user = User({ email, password });
  const result = await db('user').find({ email });
  if (result.length)
    throw AppError('email').DUPLICATED_EMAIL;
  await db('user').create(user);
};

module.exports = {
  register,
};
