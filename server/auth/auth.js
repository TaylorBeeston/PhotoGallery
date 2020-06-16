import { verifyAccessToken, verifyAndUpdateTokens } from './auth.helpers';

/**
 * Middleware that verifies that the requestor is correctly logged in, 
providing new access/refresh tokens if necessary
 *
 * @param {string} token - Current user's refresh token
 * @param {string} authorization - Current user's access token (cookie in the
 form of `Bearer: ${accessToken}`)
 * @return {string} Access/refresh tokens
 */
// eslint-disable-next-line consistent-return
export default async (request, response, next) => {
  const refreshToken = request.cookies.token;
  const accessToken = request.headers.authorization?.split(' ')[1];

  if (!accessToken && !refreshToken)
    return response.status(401).send('Unauthorized: No token provided');

  try {
    const { username } = verifyAccessToken(accessToken);
    request.username = username;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      return verifyAndUpdateTokens({ response, refreshToken });

    return response.status(401).send('Unauthorized: Invalid token');
  }
};
