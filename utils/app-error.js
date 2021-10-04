const AppError = field => ({
  DUPLICATED_EMAIL: {
    code: 'DUPLICATED_EMAIL',
    field,
  },
  LOGIN_FAILED: {
    code: 'LOGIN_FAILED',
    field,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    field,
  },
  SURVEY_NOT_FOUND: {
    code: 'SURVEY_NOT_FOUND',
    field,
  },
});

module.exports = AppError;
