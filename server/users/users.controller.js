import { Router, json } from 'express';
import User from './user.model';
import withAuth from '../auth/auth';

const router = Router();

/**
 * Gets all users from the database
 *
 * @return {string[]} Array of usernames
 */
router.route('/').get(withAuth, async (_, response) => {
  const users = (await User.find()).map((user) => user.username);
  return response.status(200).json(users);
});

export default router;
