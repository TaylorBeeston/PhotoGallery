import redis from 'redis';
import { redisUrl } from '../config';

const redisClient = redis.createClient(redisUrl);

redisClient.on('connect', () => {
  console.log(`Redis client connected at ${redisUrl}`);
});

redisClient.on('error', (error) => {
  console.log('Redis not connected', error);
});

export default redisClient;
