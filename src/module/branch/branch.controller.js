import redis from 'redis';
import httpStatus from 'http-status';
import Branch from './branch.model';

// const client = redis.createClient(process.env.REDISCLOUD_URL);
// client.on('error', (err) => {
//   console.log(`Error ${err}`);
// });

export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body }); 
    return res.status(httpStatus.OK).json(branch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};

export const getAllBranch = (req, res) => {
  try {
    const branchRedisKey = 'redis:branch';

    return client.get(branchRedisKey, async (err, listBranch) => {
      if (listBranch) {
        return res.status(httpStatus.OK).json({ scoure: 'cache', listBranches: listBranch });
      }
      const listBranches = await Branch.find({});
      client.setex(branchRedisKey, 3600, JSON.stringify(listBranches));
      return res.status(httpStatus.OK).json({ scoure: 'db', listBranches });
    });
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const getAllBranchNoCache = async (req, res) => {
  try {
    const listBranches = await Branch.find({});
    return res.status(httpStatus.OK).json({ scoure: 'db', listBranches });
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
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findOne({ _id: req.params.id });
    if (!branch) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    Object.keys(req.body).forEach(key => {
      branch[key] = req.body[key];
    });
    await branch.save();
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findOne({ _id: req.params.id });
    if (!branch) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    branch.isActive = false;
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
  
