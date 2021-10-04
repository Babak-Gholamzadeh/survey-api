const { surveyService } = require('../services');
const { asyncHandler } = require('../utils');

const createSurvey = asyncHandler(async (req, res) => {
  const {
    body: {
      closeTime,
      question,
      options,
    },
    user: {
      _id: creatorId,
    },
  } = req;
  const result = await surveyService
    .createSurvey({ creatorId, closeTime, question, options });
  res.success(result);
});

const getAllSurveys = asyncHandler(async (req, res) => {
  const {
    user: {
      _id: userId
    }
  } = req;
  const result = await surveyService
    .getAllSurveys({ userId });
  res.success(result);
});

const getOneSurvey = asyncHandler(async (req, res) => {
  const {
    params: {
      surveyId
    },
    user: {
      _id: userId
    }
  } = req;
  const result = await surveyService
    .getOneSurvey({ userId, surveyId });
  res.success(result);
});

module.exports = {
  createSurvey,
  getAllSurveys,
  getOneSurvey,
};
