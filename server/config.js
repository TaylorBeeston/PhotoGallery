export const mongoUrl =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database';
export const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const port = process.env.PORT || 9000;
export const accessTokenTimeout = 30 * 60; // 30 Minutes
export const refreshTokenTimeout = 7 * 24 * 60 * 60; // 1 Week
export const refreshTokenRefreshTime = 24 * 60 * 60; // 1 Day
