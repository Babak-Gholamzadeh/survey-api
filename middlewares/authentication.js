const jwt = require('jsonwebtoken');
const db = require('../db');
const { AppError } = require('../utils');

const authenticate = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const [, token] = authorization.split(' ');
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { data: { _id } } = decode;
    const [user] = await db('user').find({ _id });
    if(!user)
      throw new Error('user not found');
    req.user = user;
    next();
  } catch {
    next(AppError().UNAUTHORIZED);
  }
};

module.exports = authenticate;
