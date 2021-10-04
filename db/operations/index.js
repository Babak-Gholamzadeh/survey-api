const makeCreate = require('./create');
const makeFind = require('./find');
const makeUpdate = require('./update');
const makeRemove = require('./remove');
const makeDropCollection = require('./drop-collection');

const makeOperations = collection => ({
  create: makeCreate(collection),
  find: makeFind(collection),
  update: makeUpdate(collection),
  remove: makeRemove(collection),
  dropCollection: makeDropCollection(collection),
});

module.exports = makeOperations;
