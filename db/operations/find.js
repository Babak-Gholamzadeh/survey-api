const makeFind = collection => query => {
  return Object.values(collection).filter(doc => {
    for(const key in query) {
      if(doc[key] !== query[key])
        return false;
    }
    return true;
  });
};

module.exports = makeFind;
