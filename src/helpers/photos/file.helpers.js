/**
 * Creates a jpeg from a given canvas
 *
 * @async
 * @param {Canvas} canvas - canvas to convert
 * @param {number} quality - quality of resulting image
 * @return {Blob} jpeg image
 */
export const getJpegBlobFromCanvas = (canvas, quality) => {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality);
  });
};

export const getJpegFileFromCanvas = async (
  canvas,
  quality,
  metadata = { name: 'default.jpg' },
) => {
  const blob = await getJpegBlobFromCanvas(canvas, quality);
  return new File([blob], metadata.name, metadata);
};

/**
 * Creates an HTML img element from a given photo
 *
 * @async
 * @param {File} photo - image to read
 * @return {HTMLImageElement} - img element with photo as source
 */
export const getImgFromFile = async (photo) => {
  const img = document.createElement('img');

  img.src = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(photo);
  });

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  return img;
};

/**
 * Creates a canvas element from a given photo
 *
 * @async
 * @param {File} photo - image to read
 * @return {canvas} canvas element containing the read photo
 */
export const getCanvasFromFile = async (photo) => {
  const canvas = document.createElement('canvas');
  const img = await getImgFromFile(photo);

  // draw image in canvas element
  canvas.width = img.width;
  canvas.height = img.height;
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
};

/**
 * Creates an ArrayBuffer object from a given photo
 *
 * @async
 * @param {File} file - image to read
 * @return {ArrayBuffer} ArrayBuffer of the read photo
 */
export const getArrayBufferFromFile = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsArrayBuffer(file);
  });

/**
 * Finds a given value in a DataView object
 *
 * @param {DataView} dataview - object to search
 * @param {UInt16} search - value to find
 * @param {number} start - start offset
 * @param {number} end - max index to search until
 * @param {boolean} isLittleEndian - DataView's Endianness
 * @return {number} index of found search value (-1 if not found)
 */
export const findUint16InDataView = (
  dataview,
  search,
  { start = 0, end = dataview.byteLength, isLittleEndian = false },
) => {
  for (let i = start; i < end - 2; i += 2) {
    if (dataview.getUint16(i, isLittleEndian) === search) return i;
  }
  throw new Error(`${search} not found!`);
};

export const getContiguousUint8Values = (dataview, size, offset) => {
  const values = [];

  for (let i = 0; i < size; i += 1) {
    values.push(dataview.getUint8(offset + i));
  }

  return values;
};
