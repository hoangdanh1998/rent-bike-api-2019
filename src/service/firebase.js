import * as admin from 'firebase-admin';
import serviceAccount from 'C:/Users/Danh dth/Desktop/RentBikeAPI/src/bike-rental-71835-firebase-adminsdk-24krw-ef85c2228a.json';

import { Router } from 'express';
import httpStatus from 'http-status';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bike-rental-71835.firebaseio.com',
});
const routers = new Router();

routers.post('/', async (req, res) => {
  const idToken = req.params.token;
  try {
    const uid = await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ Err: error.message });
  }
});
export default routers;
