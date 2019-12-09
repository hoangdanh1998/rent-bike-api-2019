import httpStatus from 'http-status';
import Bike from './bike.model';
import constants from '../../config/constants';

export const getAllBike = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = parseInt(req.query.skip, 10) || 0;
  const status = constants.BIKESTATUS.AVAILABLE;
  try {
    const query = (status) ? { bikeStatus: status } : null;
    
    const listBike = await Bike.find(query).skip(skip).limit(limit).sort({ moneyRent: 1 })
      .populate('branch');
    const total = await Bike.count(query);
    return res.status(httpStatus.OK).json({ listBike, total });
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

