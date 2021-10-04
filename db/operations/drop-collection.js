const makeDropCollection = collection => () => {
  for(const key in collection)
    delete collection[key];
};

module.exports = makeDropCollection;
