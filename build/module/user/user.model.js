'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username is already']
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});
userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      password: this.password
    };
  }
};
exports.default = _mongoose2.default.model('User', userSchema);