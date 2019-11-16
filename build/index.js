'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middleware = require('./config/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _index = require('./module/index');

var _index2 = _interopRequireDefault(_index);

require('./config/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

(0, _middleware2.default)(app);

(0, _index2.default)(app);

app.listen(1998, () => console.log('Server runing at port 1998'));

process.on('SIGINT', () => {
  console.log('Bye bye!');process.exit();
});