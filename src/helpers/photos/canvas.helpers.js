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

/**
 * Scales a given canvas in half
 *
 * @param {canvas} canvas - canvas to scale
 * @return {canvas} scaled canvas
 */
export const halfScaleCanvas = (canvas) => {
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
export const scaleCanvas = (sourceCanvas, scale) => {
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

  for (let row = 0; row < destinationImageData.height; row += 1) {
    const y = getQuantizedPoints(row, sourceImageData.height - 1);

    for (let column = 0; column < destinationImageData.width; column += 1) {
      const x = getQuantizedPoints(column, sourceImageData.width - 1);
      const currentPixel = (column + destinationImageData.width * row) * 4;

      for (let channel = 0; channel < 4; channel += 1) {
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
 * Returns the parameters to a CanvasRenderingContext2D object's transform method
that will correctly rotate the context based on a given EXIF orientation value
 * @param {number} orientation - orientation EXIF value
 * @param {Canvas} canvas - canvas object that is being rotated
 * @return {number[]} - CanvasRenderingContext2D.transform parameters
 */
const getRotationalTransformParams = (orientation, canvas) => {
  switch (orientation) {
    case 2:
      return [-1, 0, 0, 1, canvas.width, 0];
    case 3:
      return [-1, 0, 0, -1, canvas.width, canvas.height];
    case 4:
      return [1, 0, 0, -1, 0, canvas.height];
    case 5:
      return [0, 1, 1, 0, 0, 0];
    case 6:
      return [0, 1, -1, 0, canvas.height, 0];
    case 7:
      return [0, -1, -1, 0, canvas.height, canvas.width];
    case 8:
      return [0, -1, 1, 0, 0, canvas.width];
    default:
      return [0, 0, 0, 0, 0, 0];
  }
};

/**
 * Rotates a given canvas based on its orientation
 *
 * @param {Canvas} canvas - canvas to rotate
 * @param {number} orientation - orientation EXIF value
 * @return {Canvas} rotated canvas
 *
 */
export const rotateCanvas = (canvas, orientation = 1) => {
  if (orientation === 1) return canvas;

  const rotatedCanvas = document.createElement('canvas');
  const ctx = rotatedCanvas.getContext('2d');

  if (orientation > 4 && orientation < 9) {
    rotatedCanvas.width = canvas.height;
    rotatedCanvas.height = canvas.width;
  } else {
    rotatedCanvas.width = canvas.width;
    rotatedCanvas.height = canvas.height;
  }

  ctx.transform(...getRotationalTransformParams(orientation, canvas));

  ctx.drawImage(canvas, 0, 0);

  return rotatedCanvas;
};
