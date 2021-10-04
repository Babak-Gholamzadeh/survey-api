const expressResponsehandler = (req, res, next) => {
  const handlers = {
    success: (data, message = 'operation was successful', statusCode = 200) => {
      res.status(statusCode).json({
        success: true,
        data,
        message,
      });
    },
    fail: next,
  };
  Object.assign(res, handlers);
  next();
};

module.exports = expressResponsehandler;
