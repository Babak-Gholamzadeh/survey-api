const makeCreate = collection => ({_id, ...restFields}) => {
  collection[_id] = { _id, ...restFields };
  return _id;
};

module.exports = makeCreate;
