import redis from 'redis';
import url from 'url';
import httpStatus from 'http-status';
import Branch from './branch.model';

const redisURL = url.parse(process.env.REDISCLOUD_URL);
const client = redis.createClient(redisURL.port, redisURL.hostname, { no_ready_check: true });
client.auth(redisURL.auth.split(':')[1]);

export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ ...req.body }); 
    return res.status(httpStatus.OK).json(branch);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err.message);
  }
};
client.on('error', (err) => {
  console.log(`Error ${err}`);
});
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
  
