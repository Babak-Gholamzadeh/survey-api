const makeRemove = collection => _id => {
  return delete collection[_id];
};

module.exports = makeRemove;
