import httpStatus from 'http-status';
import constants from '../config/constants';

export const isAdmin = (req, res, next) => {
  if (req.user.role === constants.ROLE.ADMIN) {
    return next();
  }
  return res.sendStatus(httpStatus.FORBIDDEN);
};
