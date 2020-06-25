import config from 'config/config';
import { getCanvasFromFile, getJpegFileFromCanvas } from './file.helpers';
import { halfScaleCanvas, scaleCanvas, rotateCanvas } from './canvas.helpers';
import { getOrientation } from './exif.helpers';

const {
  MAX_WIDTH,
  QUALITY,
  THUMBNAIL_WIDTH,
  THUMBNAIL_QUALITY,
} = config.PHOTOS;

/**
 * Optimizes a given photo using the MAX_WIDTH and QUALITY environment variables
 *
 * @async
 * @param {File} photo - image to optimize
 * @return {File} optimized image
 */
export const optimizePhoto = async (photo) => {
  let canvas = await getCanvasFromFile(photo);

  while (canvas.width >= 2 * MAX_WIDTH) {
    canvas = halfScaleCanvas(canvas);
  }

  if (canvas.width > MAX_WIDTH) {
    canvas = scaleCanvas(canvas, MAX_WIDTH / canvas.width);
  }

  return getJpegFileFromCanvas(canvas, QUALITY, photo);
};

/**
 * Generates a thumbnail using the THUMBNAIL_WIDTH and THUMBNAIL_QUALITY 
environment variables
 *
 * @async
 * @param {File} photo - image to generate thumbnail from
 * @return {File} thumbnail
 */
export const generateThumbnail = async (photo) => {
  let canvas = await getCanvasFromFile(photo);

  while (canvas.width >= 2 * THUMBNAIL_WIDTH) {
    canvas = halfScaleCanvas(canvas);
  }

  if (canvas.width > THUMBNAIL_WIDTH) {
    canvas = scaleCanvas(canvas, THUMBNAIL_WIDTH / canvas.width);
  }

  return getJpegFileFromCanvas(canvas, THUMBNAIL_QUALITY, photo);
};

/**
 * Creates a thumbnail and optimized version of a given photo
 *
 * @async
 * @param {File} photo - image to generate photos from
 * @return {File} optimizedPhoto - optimized image
 * @return {File} thumbnail - thumbnail
 */
export const getPhotoAndThumbnail = async (photo) => {
  const [optimizedPhoto, thumbnail] = await Promise.all([
    optimizePhoto(photo),
    generateThumbnail(photo),
  ]);

  return { optimizedPhoto, thumbnail };
};

/**
 * Rotates a photo based on its Orientation EXIF data
 *
 * @async
 * @param {File} file - image to rotate
 * @return {File} rotated image
 */
export const rotateFile = async (file) => {
  const orientation = await getOrientation(file);

  if (orientation === 1) return file;

  const canvas = rotateCanvas(await getCanvasFromFile(file), orientation);

  return getJpegFileFromCanvas(canvas, QUALITY, file);
};
