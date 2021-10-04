const AppError = field => ({
  DUPLICATED_EMAIL: {
    code: 'DUPLICATED_EMAIL',
    field,
  },
  LOGIN_FAILED: {
    code: 'LOGIN_FAILED',
    field,
  },
  NO_PERMISSION: {
    code: 'NO_PERMISSION',
    field,
  },
  ALREADY_ANSWERED: {
    code: 'ALREADY_ANSWERED',
    field,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    field,
  },
  OPTION_NOT_FOUND: {
    code: 'OPTION_NOT_FOUND',
    field,
  },
  SURVEY_NOT_FOUND: {
    code: 'SURVEY_NOT_FOUND',
    field,
  },
});

module.exports = AppError;
