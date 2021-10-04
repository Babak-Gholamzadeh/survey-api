const responseError = (field = 'defaultMessage') => ({
  DUPLICATED_EMAIL: {
    errors: { [field]: ['the email has already been taken'] },
    statusCode: 400,
  },
  LOGIN_FAILED: {
    errors: { [field]: ['username/password is incorrect'] },
    statusCode: 401,
  },
  BAD_REQUEST: {
    errors: { [field]: ['bad request'] },
    statusCode: 400,
  },
  UNAUTHORIZED: {
    errors: { [field]: ['unauthorized'] },
    statusCode: 401,
  },
  NOT_FOUND: {
    errors: { [field]: ['not found'] },
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    errors: { [field]: ['internal server error'] },
    statusCode: 500,
  },
});

module.exports = responseError;
