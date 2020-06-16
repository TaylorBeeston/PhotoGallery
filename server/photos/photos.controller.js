import { promises as fs } from 'fs';
import { Router, raw, json } from 'express';
import { resolve } from 'path';
import withAuth from '../auth/auth';
import Photo from './photo.model';
import config from '../config/config';
import deletePhoto from './deleters/photos.deleter';

const { UPLOADER } = config;

const router = Router();

/**
 * Adds a photo to the database
 *
 * @param {string} name - Name of the photo
 * @param {string} url - URL of the photo
 * @return {string} Photo created!
 */
router.route('/').post(json(), withAuth, async (request, response) => {
  try {
    const { url, name } = request.body;
    await Photo.findOneAndUpdate({ name }, { url, name }, { upsert: true });
    return response.status(201).send('Photo created!');
  } catch (error) {
    return response.status(400).send(error);
  }
});

/**
 * Gets all photos from the database
 *
 * @return {Array.{id: string, name: string, url: string}}
 */
router.route('/').get(async (_, response) => {
  const photos = await Photo.find();
  return response.status(200).json(
    photos.map((photo) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: photo._id,
      name: photo.name,
      url: photo.url,
    })),
  );
});

/**
 * Deletes a photo
 *
 * @param {number} id - db id of photo
 */
router.route('/:id').delete(withAuth, async (request, response) => {
  try {
    await deletePhoto(request.params.id);
    return response.status(200).send('Photo deleted successfully');
  } catch (error) {
    return response.status(500).send(error);
  }
});

// If using local file storage, add routes to host photos locally
if (UPLOADER === 'local') {
  /**
   * Stores a photo on the local filesystem
   *
   * @param {string} name - filename of stored photo
   * @param {blob} body - photo to store
   */
  router
    .route('/local/:name')
    .put(raw({ type: 'image/*', limit: '10mb' }), async (request, response) => {
      try {
        await fs.mkdir(resolve('server', 'local'), { recursive: true });
        await fs.writeFile(
          resolve('server', 'local', request.params.name),
          request.body,
        );
        return response.status(200).send('Success!');
      } catch (error) {
        return response.status(500).send(error);
      }
    });

  /**
   * Returns a given photo
   *
   * @param {string} name - filename of photo to get
   * @return {blob} photo
   */
  router.route('/local/:name').get((request, response) => {
    return response.sendFile(resolve('server', 'local', request.params.name));
  });
}

export default router;
