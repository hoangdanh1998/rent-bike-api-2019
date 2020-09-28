import userRouters from "./user/user.route";
import bikeRouters from "./bike/bike.route";
import branchRouters from "./branch/branch.route";
import bookingRouters from "./booking/booking.route";
import serviceRouters from "../service/firebase";
// import redisRouters from '../service/redis/redis-location.controller';

export default (app) => {
  app.use("/", (req, res) => res.send("hello world 2"));
  app.use("/users", userRouters);
  app.use("/bikes", bikeRouters);
  app.use("/branches", branchRouters);
  app.use("/bookings", bookingRouters);
  app.use("/service/google", serviceRouters);
  // app.use('/location', redisRouters);
};
