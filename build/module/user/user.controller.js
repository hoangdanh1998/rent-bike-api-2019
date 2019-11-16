'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

let login = exports.login = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log({ username, password });
    try {
      const user = yield _user2.default.findOne({ username, password });

      if (!user) {
        console.log('T null ne');
        throw new Error('Invalid username password');
      }
      return res.status(_httpStatus2.default.OK).json(user);
    } catch (e) {
      return res.status(_httpStatus2.default.BAD_REQUEST).json(e.message);
    }
  });

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }