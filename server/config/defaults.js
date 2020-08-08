export default {
  SERVER: {
    MONGODB_URI:
      process.env.MONGODB_URI || 'mongodb://localhost:27017/test_database',
    REDIS_URI: process.env.REDIS_URL || 'redis://localhost:6379',
    PORT: process.env.PORT || 9000,
  },
  SECURITY: {
    PASSWORD_SALT_ROUNDS: 10,
  },
  JWT: {
    ACCESS_TOKEN_TIMEOUT: 30 * 60, // 30 Mintes
    REFRESH_TOKEN_TIMEOUT: 7 * 24 * 60 * 60, // 1 Week
    REFRESH_TOKEN_REFRESH_TIME: 24 * 60 * 60, // 1 Day
    SECRET: process.env.JWT_SECRET,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  },
  UPLOADER: 'local',
};
