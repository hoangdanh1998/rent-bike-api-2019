import httpStatus from 'http-status';
import Branch from './branch.model';

export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body }); 
    return res.status(httpStatus.OK).json(branch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
}
  ;
  
