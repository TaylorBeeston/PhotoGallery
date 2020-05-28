import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import redisClient from '../redis/redis';
import {
  accessTokenTimeout,
  refreshTokenTimeout,
  refreshTokenRefreshTime,
} from '../config';

const exists = promisify(redisClient.exists).bind(redisClient);
const setex = promisify(redisClient.setex).bind(redisClient);

/**
 * Verifies a given refresh token, making sure it isn't blacklisted
 *
 * @async
 * @param {string} token - Refresh token to verify
 * @return {Object} value stored in refresh token
 * @throws {TokenExpiredError} if token is expired
 * @throws {JsonWebTokenError} if token is invalid
 * @throws {NotBeforeError} if current time is before nbf value
 */
export const verifyRefreshToken = async (token) => {
  const blacklisted = await exists(token);
  if (blacklisted === 1) return false;

  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Verifies a given access token
 *
 * @param {string} token - Access token to veify
 * @return {Object} value stored in access token
 * @throws {TokenExpiredError} if token is expired
 * @throws {JsonWebTokenError} if token is invalid
 * @throws {NotBeforeError} if current time is before nbf value
 */
export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

/**
 * Blacklists a given refresh token
 *
 * @async
 * @param {string} token - Refresh token to blacklist
 * @param {number} ttl - How long the token should be blacklisted for
 */
export const blacklistToken = async (token, ttl) => {
  await setex(token, ttl, true);
};

/**
 * Generates a new refresh token (if needed)
 *
 * @param {string} username - Username to store in the token
 * @param {string} [oldRefreshToken] - Refresh token to potentially reuse
 * @return {string} Valid refresh token
 * @throws {TokenExpiredError} if oldRefreshToken is expired
 * @throws {JsonWebTokenError} if oldRefreshToken is invalid
 * @throws {NotBeforeError} if current time is before nbf value stored in 
 oldRefreshToken
 */
export const newRefreshToken = (username, oldRefreshToken) => {
  if (oldRefreshToken) {
    const { iat, exp } = verifyRefreshToken(oldRefreshToken);
    // Only generate new token if old token expires within 24 hours
    if (exp - iat > refreshTokenRefreshTime) return oldRefreshToken;

    blacklistToken(oldRefreshToken, refreshTokenRefreshTime);
  }

  return jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshTokenTimeout,
  });
};

/**
 * Generates a new access token
 *
 * @param {string} username - Username to store in the token
 * @return {string} Valid refresh token
 */
export const newAccessToken = (username) =>
  jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: accessTokenTimeout,
  });

/**
 * Generates new access and refresh tokens
 *
 * @param {string} username - Username to store in the tokens
 * @param {string} oldRefreshToken - Old refresh token to potentially reuse
 * @return {{refreshToken: string, accessToken: string}} Object containing the 
 tokens
 */
export const newTokens = (username, oldRefreshToken) => ({
  refreshToken: newRefreshToken(username, oldRefreshToken),
  accessToken: newAccessToken(username),
});

/**
 * Returns an express response that correctly updates the client's tokens
 *
 * @param {response} response - Express response object
 * @param {string} refreshToken - Refresh token to give to client
 * @param {string} accessToken - Access token to give to client
 * @return {response} Express response that correctly updates the client's 
 tokens
 */
export const updateClientTokens = ({ response, refreshToken, accessToken }) => {
  return response
    .cookie('token', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + refreshTokenTimeout),
    })
    .status(200)
    .json({ accessToken });
};
