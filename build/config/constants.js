'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/Rent-Bike'
};

const prodConfig = {
  MONGO_URL: ''
};

const defaultConfig = {
  PORT: process.env.PORT || 1998
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));