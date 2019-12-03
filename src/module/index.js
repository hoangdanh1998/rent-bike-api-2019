import userRouters from './user/user.route';
import bikeRouters from './bike/bike.route';
import branchRouters from './branch/branch.route';
import bookingRouters from './booking/booking.route';
// import service from '../service/firebase';

export default app => {
  app.use('/users', userRouters);    
  app.use('/bikes', bikeRouters);
  app.use('/branches', branchRouters);
  app.use('/bookings', bookingRouters);
  // app.use('/service', service);
};
