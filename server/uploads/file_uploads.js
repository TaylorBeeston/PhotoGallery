import { Router } from 'express';
import withAuth from '../auth/auth';

const router = Router();

/**
 * Returns a URL to upload images to
 *
 * @param {string} name - Filename of stored image on S3
 * @return {string} signedRequest - URL used to upload image
 * @return {string} url - URL of uploaded photo
 */
router.route('/').get(withAuth, async (req, res) => {
  return res.status(200).json({
    signedRequest: `/api/photos/local/${req.query.name}`,
    url: `/api/photos/local/${req.query.name}`,
  });
});

export default router;
