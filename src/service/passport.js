import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../module/user/user.model';
import constants from '../config/constants';

const localOpts = {
  usernameField: 'username',
  passReqToCallback: false,
};
// --Encode
const localStrategy = new LocalStrategy(localOpts, async (username, password, done) => {
  try {
    const user = await User.findOne({ username, isRemoved: false });
    if (user && user.validatePassword(password)) {
      return done(null, user);
    } 
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});
passport.use(localStrategy);

// ---Decode
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('token'),
  secretOrKey: constants.JWT_SECRET,
};
const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload._id, isRemoved: false });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });

