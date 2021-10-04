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
});

module.exports = AppError;
