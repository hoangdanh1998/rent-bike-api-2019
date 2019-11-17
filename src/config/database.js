import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
  console.log('Database.js connect');
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
} catch (e) {
  mongoose.createConnection(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true });
}

mongoose.connection
  .once('open', () => console.log('    MongoDB is running'))
  .on('error', e => {
    throw e;
  });
