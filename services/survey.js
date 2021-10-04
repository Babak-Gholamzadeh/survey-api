const { Survey } = require('../models');
const db = require('../db');

const createSurvey = async ({ creatorId, closeTime, question, options }) => {
  const survey = Survey({ creatorId, closeTime, question, options });
  const _id = await db('survey').create(survey);
  return { _id };
};

module.exports = {
  createSurvey,
};
