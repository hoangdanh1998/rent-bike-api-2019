'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

try {
  console.log('Database.js connect');
  _mongoose2.default.connect(_constants2.default.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
} catch (e) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true });
}

_mongoose2.default.connection.once('open', () => console.log('   MongoDB is running 🍻')).on('error', e => {
  throw e;
});