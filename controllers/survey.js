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

const updateSurvey = asyncHandler(async (req, res) => {
  const {
    params: {
      surveyId
    },
    body: {
      closeTime
    },
    user: {
      _id: creatorId
    },
  } = req;
  const result = await surveyService
    .updateSurvey({ surveyId, closeTime, creatorId });
  res.success(result);
});

const removeSurvey = asyncHandler(async (req, res) => {
  const {
    params: {
      surveyId
    },
    user: {
      _id: creatorId
    }
  } = req;
  await surveyService
    .removeSurvey({ surveyId, creatorId });
  res.success();
});

const answerSurvey = asyncHandler(async (req, res) => {
  const {
    params: {
      surveyId
    },
    body: {
      optionId
    },
    user: {
      _id: userId
    }
  } = req;
  const result = await surveyService
    .answerSurvey({ surveyId, optionId, userId });
  res.success(result);
});


module.exports = {
  createSurvey,
  getAllSurveys,
  getOneSurvey,
  updateSurvey,
  removeSurvey,
  answerSurvey,
};
