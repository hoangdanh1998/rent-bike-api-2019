import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
  console.log('Database.js connecting');
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
} catch (e) {
  mongoose.createConnection(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true });
}

mongoose.connection
  .once('open', () => console.log('    MongoDB is running'))
  .on('error', e => {
    console.log(e.message);
    throw e;
  });
