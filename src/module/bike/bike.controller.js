import httpStatus from 'http-status';
import Bike from './bike.model';

export const getAllBike = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = parseInt(req.query.skip, 10) || 0;
  const status = null;
  try {
    const query = (status) ? { bikeStatus: status } : null;
    
    const listBike = await Bike.find(query);
    return res.status(httpStatus.OK).json(listBike);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const createBike = async (req, res) => {
  try {
    const bike = await Bike.create({ ...req.body, status: 0 }); 
    return res.status(httpStatus.OK).json(bike);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
