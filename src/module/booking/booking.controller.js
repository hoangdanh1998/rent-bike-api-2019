import httpStatus from 'http-status';
import Booking from './booking.model';
import constants from '../../config/constants'
  ;

export const getAllBooking = async (req, res) => {
  try {
    const listBooking = await Booking.find({});
    return res.status(httpStatus.OK).json(listBooking);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);       
  }
};
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    return res.status(httpStatus.OK).json(booking);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const getBookingsByUserId = async (req, res) => {
  try {
    const listBooking = await Booking.find({ user: req.params.userId });
    return res.status(httpStatus.OK).json(listBooking);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);       
  }
};
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, status: constants.BOOKINGSTATUS.WAIT });
    return res.status(httpStatus.OK).json(booking);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const updateBooking = async (req, res) => res.status(httpStatus.NOT_IMPLEMENTED);
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    if (!booking) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    booking.status = constants.BOOKINGSTATUS.CANCEL;
    await booking.save();
    return res.status(httpStatus.OK).json(booking);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
