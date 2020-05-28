import redis from 'redis';
import config from '../config/config';

const { REDIS_URI } = config.SERVER;

const redisClient = redis.createClient(REDIS_URI);

redisClient.on('connect', () => {
  console.log(`Redis client connected at ${REDIS_URI}`);
});

redisClient.on('error', (error) => {
  console.log('Redis not connected', error);
});

export default redisClient;
