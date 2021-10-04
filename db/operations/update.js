const makeUpdate = collection => (_id, entity) => {
  collection[_id] = {
    ...collection[_id],
    ...entity,
  }
  return collection[_id];
};

module.exports = makeUpdate;
