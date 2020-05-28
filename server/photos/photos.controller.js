import { Router, json } from 'express';
import withAuth from '../auth/auth';
import Photo from './photo.model';

const router = Router();

/**
 * Adds a photo to the database
 *
 * @param {string} name - Name of the photo (this will strip file extensions 
off the end)
 * @param {string} url - URL of the photo
 * @return {string} Photo created!
 */
router.route('/').post(json(), withAuth, async (request, response) => {
  try {
    const photo = new Photo({
      name: request.body.name.replace(/\..*/, ''),
      url: request.body.url,
    });
    await photo.save();
    return response.status(201).send('Photo created!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

/**
 * Gets all photos from the database
 *
 * @return {Array.{_id: string, name: string, url: string}}
 */
router.route('/').get(async (_, response) => {
  const photos = await Photo.find();
  return response.status(200).json(photos);
});

export default router;
