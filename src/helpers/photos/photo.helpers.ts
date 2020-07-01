import config from 'config/config';
import {
  getCanvasFromFile,
  getJpegFileFromCanvas,
} from 'helpers/photos/file.helpers';
import {
  halfScaleCanvas,
  scaleCanvas,
  rotateCanvas,
} from 'helpers/photos/canvas.helpers';
import { getOrientation } from './exif.helpers';

const {
  MAX_WIDTH,
  QUALITY,
  THUMBNAIL_WIDTH,
  THUMBNAIL_QUALITY,
} = config.PHOTOS;

/**
 * Optimizes a given photo using the MAX_WIDTH and QUALITY environment variables
 */
export const optimizePhoto = async (photo: File): Promise<File> => {
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
 */
export const generateThumbnail = async (photo: File): Promise<File> => {
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
 */
export const getPhotoAndThumbnail = async (
  photo: File,
): Promise<{ optimizedPhoto: File; thumbnail: File }> => {
  const [optimizedPhoto, thumbnail] = await Promise.all([
    optimizePhoto(photo),
    generateThumbnail(photo),
  ]);

  return { optimizedPhoto, thumbnail };
};

/**
 * Rotates a photo based on its Orientation EXIF data
 */
export const rotatePhoto = async (photo: File): Promise<File> => {
  const orientation = await getOrientation(photo);

  if (orientation === 1) return photo;

  const canvas = rotateCanvas(await getCanvasFromFile(photo), orientation);

  return getJpegFileFromCanvas(canvas, QUALITY, photo);
};
