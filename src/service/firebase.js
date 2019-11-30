import * as admin from 'firebase-admin';
import serviceAccount from 'C:/Users/Danh dth/Desktop/RentBikeAPI/src/rent-bike-2019-firebase-firebase-adminsdk-kevd7-656855e417.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rent-bike-2019-firebase.firebaseio.com',
});
