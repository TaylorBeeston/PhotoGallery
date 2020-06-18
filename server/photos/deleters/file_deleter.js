import { promises as fs } from 'fs';
import { resolve } from 'path';
import Photo from '../photo.model';

/**
 * Deletes a file from both the db and the filesystem
 *
 * @function deletePhoto
 * @param {number} id - Database id of photo
 */
const deletePhoto = async (id) => {
  const { name } = await Photo.findOne({ _id: id });
  await Promise.all([
    fs.unlink(resolve('server', 'local', name)),
    fs.unlink(resolve('server', 'local', `thumb_${name}`)),
    Photo.deleteOne({ _id: id }),
  ]);
};

export default deletePhoto;
