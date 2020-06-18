/**
 * @typedef {Object} QuantizedPoints
 * @property {number} vector - float representation of the scaled pixel index
 * @property {number} floor - scaled pixel index rounded down
 * @property {number} ceiling - scaled pixel index rounded up
 */

/**
 * @typedef {Object} InterpolationData
 * @property {number} ul - upper left quantized pixel value
 * @property {number} ur - upper right quantized pixel value
 * @property {number} ll - lower left quantized pixel value
 * @property {number} lr - lower right quantized pixel value
 * @property {number} x - float representation of the scaled x index
 * @property {number} y - float representation of the scaled y index
 */

const MAX_WIDTH = process.env.PHOTO_MAX_WIDTH || 800;
const THUMBNAIL_WIDTH = process.env.PHOTO_THUMBNAIL_WIDTH || 20;
const QUALITY = process.env.PHOTO_QUALITY || 0.9;
const THUMBNAIL_QUALITY = process.env.PHOTO_THUMBNAIL_QUALITY || 0.5;

/**
 * Scales a given canvas in half
 *
 * @param {canvas} canvas - canvas to scale
 * @return {canvas} scaled canvas
 */
const halfScale = (canvas) => {
  const halfCanvas = document.createElement('canvas');
  halfCanvas.width = canvas.width / 2;
  halfCanvas.height = canvas.height / 2;

  halfCanvas
    .getContext('2d')
    .drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

  return halfCanvas;
};
/**
 * Scales a given canvas using bilinear interpolation
 *
 * @param {canvas} sourceCanvas - canvas to scale
 * @param {number} scale - scaling factor
 * @return {canvas} scaled canvas
 */
const bilinearInterpolate = (sourceCanvas, scale) => {
  /**
   * Creates an object containing a scaled vector and its quantized points from
  a given pixel index
   *
   * @param {number} index - index of pixel in source image
   * @param {number} max - maximum pixel index in destination image
   * @return {QuantizedPoints} scaled vector and quantized points
   */
  const getQuantizedPoints = (index, max) => ({
    vector: index / scale,
    floor: Math.floor(index / scale),
    ceiling: Math.min(Math.ceil(index / scale), max),
  });

  /**
   * Creates an object containing four the four corners to interpolate, and the
  x and y vectors used to create weights when interpolating
   *
   * @param {QuantizedPoints} x - horizontal pixel locations
   * @param {QuantizedPoints} y - vertical pixel locations
   * @param {number} channel - RGBA channel represented as an integer 0-3
   * @param {ImageData} imageData - destination ImageData
   * @return {InterpolationData} data needed to interpolate a pixel
   */
  const getInterpolationData = (x, y, channel, imageData) => ({
    ul: imageData.data[(x.floor + imageData.width * y.floor) * 4 + channel],
    ur: imageData.data[(x.ceiling + imageData.width * y.floor) * 4 + channel],
    ll: imageData.data[(x.floor + imageData.width * y.ceiling) * 4 + channel],
    lr: imageData.data[(x.ceiling + imageData.width * y.ceiling) * 4 + channel],
    x: x.vector - x.floor,
    y: y.vector - y.floor,
  });

  /**
   * Bilinear interpolates between four values using x and y values for weights
   *
   * @param {number} ul - upper left value
   * @param {number} ur - upper right value
   * @param {number} ll - lower left value
   * @param {number} lr - lower right value
   * @param {number} x - x value represented as a float between 0 and 1.0
   * @param {number} y - y value represented as a float between 0 and 1.0
   * @return {number} interpolated value
   */
  const interpolate = ({ ul, ur, ll, lr, x, y }) => {
    const unX = 1.0 - x;
    const unY = 1.0 - y;

    return ul * unX * unY + ur * x * unY + ll * unX * y + lr * x * y;
  };

  const scaledCanvas = document.createElement('canvas');
  scaledCanvas.width = sourceCanvas.width * scale;
  scaledCanvas.height = sourceCanvas.height * scale;

  const sourceImageData = sourceCanvas
    .getContext('2d')
    .getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  const destinationImageData = scaledCanvas
    .getContext('2d')
    .createImageData(scaledCanvas.width, scaledCanvas.height);

  // eslint-disable-next-line no-plusplus
  for (let row = 0; row < destinationImageData.height; row++) {
    const y = getQuantizedPoints(row, sourceImageData.height - 1);

    // eslint-disable-next-line no-plusplus
    for (let column = 0; column < destinationImageData.width; column++) {
      const x = getQuantizedPoints(column, sourceImageData.width - 1);
      const currentPixel = (column + destinationImageData.width * row) * 4;

      // eslint-disable-next-line no-plusplus
      for (let channel = 0; channel < 4; channel++) {
        destinationImageData.data[currentPixel + channel] = interpolate(
          getInterpolationData(x, y, channel, sourceImageData),
        );
      }
    }
  }

  scaledCanvas.getContext('2d').putImageData(destinationImageData, 0, 0);
  return scaledCanvas;
};

/**
 * Creates a canvas element from a given photo
 *
 * @async
 * @param {File} photo - image to read
 * @return {canvas} canvas element containing the read photo
 */
const readPhoto = async (photo) => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');

  // create img element from File object
  img.src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(photo);
  });
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // draw image in canvas element
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
};

/**
 * Optimizes a given photo using the MAX_WIDTH and QUALITY environment variables
 *
 * @async
 * @param {File} photo - image to optimize
 * @return {blob} optimized image
 */
export const optimizePhoto = async (photo) => {
  let canvas = await readPhoto(photo);

  while (canvas.width >= 2 * MAX_WIDTH) {
    canvas = halfScale(canvas);
  }

  if (canvas.width > MAX_WIDTH) {
    canvas = bilinearInterpolate(canvas, MAX_WIDTH / canvas.width);
  }

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', QUALITY);
  });
};

/**
 * Generates a thumbnail using the THUMBNAIL_WIDTH and THUMBNAIL_QUALITY 
environment variables
 *
 * @async
 * @param {File} photo - image to generate thumbnail from
 * @return {blob} thumbnail
 */
export const generateThumbnail = async (photo) => {
  let canvas = await readPhoto(photo);

  while (canvas.width >= 2 * THUMBNAIL_WIDTH) {
    canvas = halfScale(canvas);
  }

  if (canvas.width > THUMBNAIL_WIDTH) {
    canvas = bilinearInterpolate(canvas, THUMBNAIL_WIDTH / canvas.width);
  }

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', THUMBNAIL_QUALITY);
  });
};

/**
 * Creates a thumbnail and optimized version of a given photo
 *
 * @async
 * @param {File} photo - image to generate photos from
 * @return {blob} optimizedPhoto - optimized image
 * @return {blob} thumbnail - thumbnail
 */
export const getPhotoAndThumbnail = async (photo) => {
  const [optimizedPhoto, thumbnail] = await Promise.all([
    optimizePhoto(photo),
    generateThumbnail(photo),
  ]);

  return { optimizedPhoto, thumbnail };
};
