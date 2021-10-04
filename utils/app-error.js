const AppError = field => ({
  DUPLICATED_EMAIL: {
    code: 'DUPLICATED_EMAIL',
    field,
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    field,
  },
});

module.exports = AppError;
