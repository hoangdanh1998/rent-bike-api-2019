/* eslint-disable no-sparse-arrays */
import httpStatus from 'http-status';
import Booking from './booking.model';
import constants from '../../config/constants';

export const getAllBooking = async (req, res) => {
  try {
    const listBooking = await Booking.find({}).populate({ path: 'bike', 
      populate: {
        path: 'branch',
      } }).populate('user');
    const total = await Booking.count({});    
    return res.status(httpStatus.OK).json({ listBooking, total });
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
    const total = await Booking.count({ user: req.params.userId });
    return res.status(httpStatus.OK).json({ listBooking, total });
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

export const getMostBooking = async (req, res) => {
  try {
    const aggregate = await Booking.aggregate([{
      $lookup: {
        from: 'bikes',
        localField: 'bike',
        foreignField: '_id',
        as: 'bike',
      }, 
    }, 
    { $unwind: '$bike' }, 
    { $sortByCount: '$bike' },
    ]);
    return res.status(httpStatus.OK).json(aggregate);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({ Error: err.message });
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
