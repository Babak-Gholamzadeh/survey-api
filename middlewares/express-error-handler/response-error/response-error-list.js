const responseError = (field = 'defaultMessage') => ({
  DUPLICATED_EMAIL: {
    errors: { [field]: ['the email has already been taken'] },
    statusCode: 400,
  },
  BAD_REQUEST: {
    errors: { [field]: ['bad request'] },
    statusCode: 400,
  },
  NO_PERMISSION: {
    errors: { [field]: ['you do not have permission to update this survey']}
  },
  ALREADY_ANSWERED: {
    errors: { [field]: ['you have already answered the survey and you cannot answer it again or change your answer']}
  },
  LOGIN_FAILED: {
    errors: { [field]: ['username/password is incorrect'] },
    statusCode: 401,
  },
  UNAUTHORIZED: {
    errors: { [field]: ['unauthorized'] },
    statusCode: 401,
  },
  OPTION_NOT_FOUND: {
    errors: { [field]: ['option not found'] },
    statusCode: 404,
  },
  SURVEY_NOT_FOUND: {
    errors: { [field]: ['survey not found'] },
    statusCode: 404,
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
