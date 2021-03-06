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
  .get('/surveys', authenticate, surveyController.getAllSurveys)
  .get('/surveys/:surveyId', authenticate, surveyController.getOneSurvey)
  .patch('/surveys/:surveyId', authenticate, validator.updateSurvey, surveyController.updateSurvey)
  .delete('/surveys/:surveyId', authenticate, surveyController.removeSurvey)
  .post('/surveys/:surveyId/answer', authenticate, validator.answerSurvey, surveyController.answerSurvey)

  // Handle all the response errors
  .use(expressErrorHandler)

  // api documentation
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
