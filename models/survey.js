const { v4: uuidv4 } = require('uuid');

const Survey = ({ creatorId, closeTime, question, options = []}) => {
  if (!creatorId)
    throw new Error('creatorId is required!');
  if (!closeTime)
    throw new Error('closeTime is required!');
  if (!question)
    throw new Error('question is required!');
  if (options.length < 2)
    throw new Error('at least two options are required!');
  options = options.map(description => ({
    _id: uuidv4(),
    description,
    userIds: [],
  }));
  const participantIds = [];
  const _id = uuidv4();
  const survey = {
    _id,
    creatorId,
    closeTime,
    question,
    participantIds,
    options,
  };
  return survey;
};

module.exports = Survey;
