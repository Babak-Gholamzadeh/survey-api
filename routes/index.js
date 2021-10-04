const router = require('express').Router();
const {
  expressResponsehandler,
  validator,
  expressErrorHandler,
} = require('../middlewares');
const { authController } = require('../controllers');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

router
  // Assign `success` and `fail` methods to `res` object
  .use(expressResponsehandler)

  // All the endpoints
  .post('/register', validator.register, authController.register)

  // Handle all the response errors
  .use(expressErrorHandler)

  // api documentation
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
