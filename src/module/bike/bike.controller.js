import httpStatus from 'http-status';
import Bike from './bike.model';
import constants from '../../config/constants';
import Booking from '../booking/booking.model';

export const getAllBike = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = parseInt(req.query.skip, 10) || 0;
  const status = constants.BIKESTATUS.AVAILABLE;
  try {
    const listBike = await Bike.find({}).skip(skip).limit(limit).sort({ moneyRent: 1 })
      .populate('branch');
    const total = await Bike.count({});
    return res.status(httpStatus.OK).json({ listBike, total });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const getAllBikeFilter = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = parseInt(req.query.skip, 10) || 0;
  const status = constants.BIKESTATUS.AVAILABLE;
  const pickUpDate = req.query.pickUpDate;
  const returnDate = req.query.returnDate;
  const transmissionType = req.query.transmissionType;
  
  try {
    const listBike = [];
    await Booking.find({ 
      $or: [
        { pickUpDate: { $gt: returnDate } },
        { returnDate: { $lt: pickUpDate } },
      ],
    }, { bike: 1 }, (err, cursor) => {
      // console.log({ cursor });
      for (const document of cursor) {
        // console.log(document.bike);
        if (!listBike.includes(document) && !document) { listBike.push(document.bike); }
      }
    }).populate('bike');
    console.log(transmissionType);
    const listBike1 = listBike.filter(bike => bike.transmissionType == transmissionType);
    const total = listBike1.length;
     
    return res.status(httpStatus.OK).json({ listBike: listBike1, total });
    // .json({ listBike, total })
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const getBikeById = async (req, res) => {
  try {
    const bike = await Bike.findOne({ _id: req.params.id });
    if (!bike) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json(bike);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const createBike = async (req, res) => {
  try {
    const bike = await Bike.create({ ...req.body, status: constants.BIKESTATUS.AVAILABLE }); 
    return res.status(httpStatus.OK).json(bike);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const updateBike = async (req, res) => {
  try {
    const bike = Bike.findOne({ _id: req.params.id });
    if (!bike) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    Bike.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, bikeU) => {
      if (err) {
        throw (err);
      }
      return res.status(httpStatus.OK).json(bikeU);
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findOne({ _id: req.params.id });
    if (!bike) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    bike.bikeStatus = constants.BIKESTATUS.DISABLE;
    console.log(bike);

    await bike.save();
    return res.status(httpStatus.OK).json(bike.toJSON());
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }     
};

