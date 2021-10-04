const makeOperations = require('./operations');

const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME_DEV;

const databases = {
  [DB_NAME]: {}
};

const db = collectionName => {
  const database = databases[DB_NAME];
  if (!database[collectionName])
    database[collectionName] = {};
  const collection = database[collectionName];
  return makeOperations(collection);
};

module.exports = db;
