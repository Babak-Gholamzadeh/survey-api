const { Survey } = require('../models');
const db = require('../db');
const { AppError } = require('../utils');

const createSurvey = async ({ creatorId, closeTime, question, options }) => {
  const survey = Survey({ creatorId, closeTime, question, options });
  const _id = await db('survey').create(survey);
  return { _id };
};

const getAllSurveys = async ({ userId }) => {
  const surveys = await db('survey').find().map(normalizeSurvey.bind(null, userId));
  return { surveys };
};

const getOneSurvey = async ({ userId, surveyId }) => {
  const [survey] = await db('survey').find({ _id: surveyId }).map(normalizeSurvey.bind(null, userId));

  if (!survey)
    throw AppError().SURVEY_NOT_FOUND;

  return survey;
};

const normalizeSurvey = (userId, { _id, closeTime, participantIds, question, options }) => {
  const totalParticipants = participantIds.length;
  const option = options.find(op => op.userIds.find(id => userId === id));
  const yourAnswer = option && option._id;
  options = options.map(({ _id, description, userIds }) => ({
    _id,
    description,
    totalUsers: userIds.length,
  }));

  return {
    _id,
    closeTime,
    totalParticipants,
    question,
    yourAnswer,
    options,
  };
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getOneSurvey,
};
