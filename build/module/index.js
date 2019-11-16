'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user/user.route');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/user', _user2.default);
};