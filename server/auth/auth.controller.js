import { Router, json } from 'express';
import withAuth from './auth';
import User from '../users/user.model';
import { newTokens, updateClientTokens, blacklistToken } from './auth.helpers';

const router = Router();

/**
 * Verifies a given username/password combo and returns an access/refresh token
 if valid
 *
 * @param {string} username - Username to verify
 * @param {string} password - Password to verify
 * @return {string} Access/refresh tokens
 */
router.route('/login').post(json(), async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return response.status(401).send('Invalid username or password');

    if (await user.isCorrectPassword(password)) {
      const { refreshToken, accessToken } = newTokens(username);

      return updateClientTokens({
        response,
        username,
        refreshToken,
        accessToken,
      });
    }

    return response.status(401).send('Invalid username or password');
  } catch (error) {
    console.log('Error handling login: ', error);
    return response.status(400).send('Internal Server Error, Please Try Again');
  }
});

/**
 * Logs out the current user
 *
 * @param {string} token - Current user's refresh token
 * @return {string} Logged out succcessfully
 */
router.route('/logout').get(withAuth, async (request, response) => {
  const { token } = request.cookies;
  await blacklistToken(token, 30 * 24 * 60 * 60);
  return response
    .clearCookie('token')
    .status(200)
    .send('Logged out successfully!');
});

/**
 * Gives currently logged in user a new access token and refresh token (if 
needed)
 *
 * @param {string} token - Current user's refresh token
 * @return {string} Access/refresh tokens
 */
router.route('/refreshToken').get(withAuth, (request, response) => {
  const { username } = request;
  const oldRefreshToken = request.cookies.token;
  try {
    const { refreshToken, accessToken } = newTokens(username, oldRefreshToken);
    return updateClientTokens({
      response,
      username,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    return response.status(401).send('Unauthorized: Invalid token');
  }
});

export default router;
