const { User } = require('../models');
const db = require('../db');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils');

const register = async ({ email, password }) => {
  email = email.toLowerCase();
  const user = User({ email, password });
  const result = await db('user').find({ email });
  if (result.length)
    throw AppError('email').DUPLICATED_EMAIL;
  await db('user').create(user);
};

const login = async ({ email, password }) => {
  try {
    email = email.toLowerCase();
    const result = await db('user').find({ email });
    if (!result.length)
      throw new Error('There is no account with this email!');
    const [user] = result;
    if (user.password !== password)
      throw new Error('Password is incorrect!');
    const token = generateToken(user._id);
    return { token };
  } catch(err) {
    throw AppError().LOGIN_FAILED;
  }
};

const generateToken = _id => jwt.sign({
  data: { _id },
}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

module.exports = {
  register,
  login,
  generateToken,
};
