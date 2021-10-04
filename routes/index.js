const router = require('express').Router();
const {
  expressResponsehandler,
  validator,
  authenticate,
  expressErrorHandler,
} = require('../middlewares');
const {
  authController,
  surveyController,
} = require('../controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

router
  // Assign `success` and `fail` methods to `res` object
  .use(expressResponsehandler)

  // All the endpoints
  .post('/register', validator.register, authController.register)
  .post('/login', validator.login, authController.login)
  .post('/surveys', authenticate, validator.createSurvey, surveyController.createSurvey)

  // Handle all the response errors
  .use(expressErrorHandler)

  // api documentation
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
