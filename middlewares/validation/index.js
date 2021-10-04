const Ajv = require('ajv');
const register = require('./schemas/register.json');
const login = require('./schemas/login.json');
const createSurvey = require('./schemas/create-survey.json');

const validator = schema => {
  const validate = new Ajv({ allErrors: true }).compile(schema);
  return (req, res, next) => {
    const isValid = validate(req.body);
    if (!isValid)
      return next(validate.errors);
    next();
  };
};

module.exports = {
  register: validator(register),
  login: validator(login),
  createSurvey: validator(createSurvey),
};
