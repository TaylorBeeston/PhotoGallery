import {
  getArrayBuffer,
  findUint16InDataView,
  getContiguousUint8Values,
} from 'helpers/photos/file.helpers';

const TAGS = {
  EXIF_START: 0xffe1,
  ORIENTATION: 0x0112,
  DATETIME: 0x0132,
  DATETIME_ORIGINAL: 0x9003,
  LITTLE_ENDIAN_INDICATOR: 0x4949,
};

/**
 * Pulls the first 128kb of a given blob and returns it as a DataView
 * The Exif specification states that all exif data should exist in the first
 * 64kb, but 128kb are pulled just to be safe.
 */
const getExifDataview = async (photo: Blob) =>
  new DataView(await getArrayBuffer(photo.slice(0, 131072)));

/**
 * Finds the exif data start index in a given DataView
 */
const getExifStartIndex = (dataview: DataView): number =>
  findUint16InDataView(dataview, TAGS.EXIF_START, { start: 2 });

/**
 * Finds the exif data ending index in a given DataView
 */
const getExifEndIndex = (
  dataview: DataView,
  exifStartIndex: number,
  isLittleEndian: boolean,
): number =>
  exifStartIndex + 2 + dataview.getUint16(exifStartIndex + 2, isLittleEndian);

/**
 * Finds the endianness of the exif data in a given DataView
 */
const getEndianness = (dataview: DataView, exifStartIndex: number): boolean =>
  dataview.getUint16(exifStartIndex + 10) === TAGS.LITTLE_ENDIAN_INDICATOR;

/**
 * Finds the starting index of a given exif tag
 */
const getTagIndex = (
  dataview: DataView,
  tag: number,
  exifStartIndex: number,
  isLittleEndian: boolean,
): number =>
  findUint16InDataView(dataview, tag, {
    start: exifStartIndex + 12,
    end: getExifEndIndex(dataview, exifStartIndex, isLittleEndian),
    isLittleEndian,
  });

/**
 * Finds the size attribute of a given exif tag
 */
const getTagSize = (
  dataview: DataView,
  tagIndex: number,
  isLittleEndian: boolean,
): number => dataview.getUint32(tagIndex + 4, isLittleEndian);

type ExifTagParams = {
  dataview: DataView;
  tagIndex: number;
  tagSize: number;
  exifStartIndex: number;
  isLittleEndian: boolean;
};

/**
 * Returns a given exif tag's value
 *
 * Please note! For simplicity, this function is ignoring the type value stored
 * for each EXIF tag and is assuming type 3 (SHORT) for a tag of size 1 and type
 * 2 (ASCII) for a tag of a bigger size.
 *
 * If you need to parse additional tags that do not follow this convention,
 * you will need to change this function to do so
 */
const getTagValue = ({
  dataview,
  tagIndex,
  tagSize,
  exifStartIndex,
  isLittleEndian,
}: ExifTagParams): number[] => {
  if (tagSize > 1) {
    const tiffOffset = exifStartIndex + 10;
    return getContiguousUint8Values(
      dataview,
      tagSize - 1, // ignore NULL at the end
      dataview.getUint32(tagIndex + 8, isLittleEndian) + tiffOffset,
    );
  }

  return [dataview.getUint16(tagIndex + 8, isLittleEndian)];
};

/**
 * Determines whether a given DataView is of a Jpeg
 */
const isJpeg = (dataview: DataView): boolean =>
  dataview.byteLength >= 2 && dataview.getUint16(0) === 0xffd8;

/**
 * Returns the value of a given exif tag in a Jpeg image
 */
const getJpegTag = (dataview: DataView, tag: number): number[] | null => {
  try {
    const exifStartIndex = getExifStartIndex(dataview);
    const isLittleEndian = getEndianness(dataview, exifStartIndex);
    const tagIndex = getTagIndex(dataview, tag, exifStartIndex, isLittleEndian);
    const tagSize = getTagSize(dataview, tagIndex, isLittleEndian);

    return getTagValue({
      dataview,
      tagIndex,
      tagSize,
      exifStartIndex,
      isLittleEndian,
    });
  } catch (error) {
    return null;
  }
};

/**
 * Parses a date string from an Exif tag
 * (Exif Date strings are of the format YYYY:MM:DD HH:mm:ss)
 */
const parseExifDateString = (exifDate: string): Date => {
  const [date, time] = exifDate.split(' ');
  const [year, month, day] = date.split(':');
  const [hour, minute, second] = time.split(':');
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );
};

/**
 * Searches for the datetime exif data stored in a given DataView
 */
const getExifDate = (dataview: DataView): Date | null => {
  const tagData =
    getJpegTag(dataview, TAGS.DATETIME_ORIGINAL) ??
    getJpegTag(dataview, TAGS.DATETIME);

  return tagData && parseExifDateString(String.fromCharCode(...tagData));
};

/**
 * Tries to get the exif date value from a photo
 */
export const getDatePhotoWasTaken = async (photo: File): Promise<Date> => {
  const dataview = await getExifDataview(photo);

  return (
    (isJpeg(dataview) && getExifDate(dataview)) ||
    new Date(photo.lastModified) ||
    new Date()
  );
};

/**
 * Tries to get the exif orientation value from a photo
 */
export const getOrientation = async (photo: File): Promise<number> => {
  const dataview = await getExifDataview(photo);
  const exifValue = isJpeg(dataview) && getJpegTag(dataview, TAGS.ORIENTATION);

  return (exifValue && exifValue[0]) || 1;
};
