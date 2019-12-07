/* eslint-disable no-sparse-arrays */
import httpStatus from 'http-status';
import Booking from './booking.model';
import constants from '../../config/constants';
import Branch from '../branch/branch.model';
import User from '../user/user.model';

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
    const type = req.param.type;
    let receiveAddress;
    let receiveLongtitude;
    let receiveLatitude;
    let returnLongtitude;
    let returnLatitude;
    console.log(type);
  
    if (type === constants.DELIVERYTYPE.ATBRANCH) {
      try {
        const branch = await Branch.findById({ _id: req.body.branchid });
        receiveAddress = branch.address;
        receiveLongtitude = branch.receiveLongtitude;
        receiveLatitude = branch.returnLatitude;
        returnLongtitude = branch.returnLongtitude;
        returnLatitude = branch.returnLatitude;
      } catch (err) {
        return res.status(httpStatus.NOT_FOUND).json('Branch not found');
      }
    } else {
      receiveAddress = req.body.receiveAddress;
    }
    
    const user = await User.findOne({ _id: req.body.user });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json('User not found');
    }
    console.log({ ...req.body });
    console.log({ user });
    const tempBooking = {
      bike: req.body.bike,
      user: req.body.user,
      pickUpDate: req.body.pickUpDate,
      returnDate: req.body.returnDate,
      receiveAddress,
      returnAddress: req.body.receiveAddress,
      bookingDate: new Date(),
      receiveLongtitude, 
      receiveLatitude, 
      returnLongtitude, 
      returnLatitude,
      phone: user.phone,
      fullname: user.fullname,            
      bookingStatus: constants.BOOKINGSTATUS.WAITTING,
    };
    console.log(tempBooking);
    const booking = await Booking.create({ ...tempBooking });
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
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    if (!booking) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    Object.keys(req.body).forEach(key => {
      booking[key] = req.body[key];
    });
    await booking.save();
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({ Error: err.message });
  }
}; 

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
