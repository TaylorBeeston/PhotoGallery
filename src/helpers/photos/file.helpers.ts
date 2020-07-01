import { get2dContext } from 'helpers/photos/canvas.helpers';

/**
 * Creates a jpeg from a given canvas
 */
export const getJpegBlobFromCanvas = (
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> =>
  new Promise((resolve, reject): void => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('Error creating blob from canvas!')),
      'image/jpeg',
      quality,
    );
  });

interface FileMetadata extends FilePropertyBag {
  name: string;
}

/**
 * Creates a File object from a given canvas with given metadata
 */
export const getJpegFileFromCanvas = async (
  canvas: HTMLCanvasElement,
  quality: number,
  metadata: FileMetadata = { name: 'default.jpg', lastModified: Date.now() },
): Promise<File> => {
  const blob = await getJpegBlobFromCanvas(canvas, quality);
  return new File([blob], metadata.name, metadata);
};

/**
 * Creates an HTML img element from a given photo
 */
export const getImgFromFile = async (
  photo: File,
): Promise<HTMLImageElement> => {
  const img = document.createElement('img');

  img.src = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Error reading photo'));
      }
    };
    reader.readAsDataURL(photo);
  });

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  return img;
};

/**
 * Creates a canvas element from a given photo
 */
export const getCanvasFromFile = async (
  photo: File,
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  const img = await getImgFromFile(photo);

  // draw image in canvas element
  canvas.width = img.width;
  canvas.height = img.height;
  get2dContext(canvas).drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
};

/**
 * Creates an ArrayBuffer object from a given photo
 */
export const getArrayBuffer = (blob: Blob): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'object') {
        resolve(event.target.result);
      } else {
        reject(new Error('Error reading blob'));
      }
    };
    reader.readAsArrayBuffer(blob);
  });

type DataViewSearchParams = {
  start: number;
  end: number;
  isLittleEndian: boolean;
};

/**
 * Finds a given UInt16 value in a DataView object
 */
export const findUint16InDataView = (
  dataview: DataView,
  search: number,
  {
    start = 0,
    end = dataview.byteLength,
    isLittleEndian = false,
  }: Partial<DataViewSearchParams>,
): number => {
  for (let i = start; i < end - 2; i += 2) {
    if (dataview.getUint16(i, isLittleEndian) === search) return i;
  }
  throw new Error(`${search} not found!`);
};

/**
 * Finds contiguous UInt8 values in a Dataview object
 */
export const getContiguousUint8Values = (
  dataview: DataView,
  size: number,
  offset: number,
): number[] => {
  const values = [];

  for (let i = 0; i < size; i += 1) {
    values.push(dataview.getUint8(offset + i));
  }

  return values;
};
