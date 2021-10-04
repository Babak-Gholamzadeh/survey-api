const { authService } = require('../services');
const { asyncHandler } = require('../utils');

const register = asyncHandler(async (req, res) => {
  const {
    body: {
      email,
      password,
    },
  } = req;
  const result = await authService.register({ email, password });
  res.success(result);
});

module.exports = {
  register,
};
