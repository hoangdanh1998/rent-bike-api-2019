const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/Rent-Bike',
};

const prodConfig = {
  MONGO_URL: 'mongodb+srv://hoangdanh:danh02071998@cluster0-ibpiq.mongodb.net/test?retryWrites=true&w=majority',
};
  
const defaultConfig = {
  PORT: process.env.PORT || 8080,
};

function envConfig(env) {
  switch (env) {
    case 'dev':
      return devConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
