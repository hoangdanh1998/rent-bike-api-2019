import httpStatus from 'http-status';
import Branch from './branch.model';

export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body }); 
    return res.status(httpStatus.OK).json(branch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const getAllBranch = async (req, res) => {
  try {
    const listBranch = await Branch.find({});
    return res.status(httpStatus.OK).json(listBranch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).json(branch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
  
