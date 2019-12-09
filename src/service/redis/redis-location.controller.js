import redis from 'redis';
import httpStatus from 'http-status';

const client = redis.createClient(process.env.REDISCLOUD_URL);
client.on('error', (err) => {
  console.log(`Error ${err}`);
});
export const getLocation = (req, res) => {
  const locationRedisKey = 'redis:location';
  return client.get(locationRedisKey, async (err, location) => {
    if (err) {
      return res.status(httpStatus.BAD_REQUEST).json(err.message);
    }
    return res.status(httpStatus.OK).json(location);
  });
};
export const setLocation = (req, res) => {
  const locationRedisKey = 'redis:location';
  const location = { ...req.body };
  client.setex(locationRedisKey, 3600, JSON.stringify(location));
  return res.status(httpStatus.OK).json(location);
};
