const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/Rent-Bike',
  JWT_SECRET: 'what-is-that',
};

const prodConfig = {
  MONGO_URL: 'mongodb+srv://hoangdanh:danh02071998@cluster0-ibpiq.mongodb.net/rent_bike?retryWrites=true&w=majority',
  JWT_SECRET: 'what-is-that',
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
  TOKEN_LIFESPAN: 2,
  ROLE: {
    ADMIN: 0,
    USER: 1,
  },
  BIKESTATUS: {
    AVAILABLE: 0,
    USING: 1,
    DISABLE: 2,
  },
  BOOKINGSTATUS: {
    WAITTING: 0,
    ACCEPTED: 1,
    USING: 2,
    SUCCESS: 3,
    CANCEL: 4,
  },
  DELIVERYTYPE: {
    ATBRANCH: 0,
    ATHOME: 1,
  },
  
};
