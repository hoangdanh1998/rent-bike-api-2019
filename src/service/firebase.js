import { Router } from 'express';
import httpStatus from 'http-status';
import * as admin from 'firebase-admin';
import serviceAccount from './bike-rental-71835-firebase-adminsdk-24krw-8232761aff.json';
import User from '../module/user/user.model';
import constants from '../config/constants.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bike-rental-71835.firebaseio.com',
});
const registrationToken = 'YOUR_REGISTRATION_TOKEN';

const routers = new Router();
routers.get('/', async (req, res) => {
  const idToken = req.headers.token;
  try {
    const fromToken = await admin.auth().verifyIdToken(idToken);
    //     const fromToken = { name: 'nguyen sam',
    //       picture:
    //  'https://lh3.googleusercontent.com/a-/AAuE7mCO2HleeHaaGemhDiMJwj8mMKfCdd8b3YI2Cp-LMg=s96-c',
    //       iss: 'https://securetoken.google.com/bike-rental-71835',
    //       aud: 'bike-rental-71835',
    //       auth_time: 1575394034,
    //       user_id: 'I2rK7Kf3HmhKoawfxB4sXnecWDu2',
    //       sub: 'I2rK7Kf3HmhKoawfxB4sXnecWDu2',
    //       iat: 1575394034,
    //       exp: 1575397634,
    //       email: 'samxxx2511997@gmail.com',
    //       email_verified: true,
    //       firebase:
    //  { identities: { 'google.com': [Array], email: [Array] },
    //    sign_in_provider: 'google.com' },
    //       uid: 'I2rK7Kf3HmhKoawfxB4sXnecWDu3' };

    const id = fromToken.uid;
    const user = await User.findOne({ uid: id });
    if (user) {
      return res.status(httpStatus.OK).json(user.toAuthJSON()); 
    }
    const username = Math.random().toString(36).substring(10);
    const createUser = await User.create({ 
      username,
      uid: id,
      email: fromToken.email,
      avatar: fromToken.picture,
      fullname: fromToken.name,
      role: constants.ROLE.USER });
    
    return res.status(httpStatus.OK).json(createUser.toAuthJSON());
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
});
routers.post('/', async (req, res) => {
  const payload = {
    data: {
      score: '850',
      time: '2:45',
    },
    token: registrationToken,
  };
  // Send a message to the device corresponding to the provided
  // registration token.
  const response = await admin.messaging().send(payload)
    .catch((error) => {
      console.log('Error sending message:', error);
    });
  console.log('Successfully sent message:', response);
});
export default routers;
