import {
  getArrayBufferFromFile,
  findUint16InDataView,
  getContiguousUint8Values,
} from './file.helpers';

const TAGS = {
  EXIF_START: 0xffe1,
  ORIENTATION: 0x0112,
  DATETIME: 0x0132,
  DATETIME_ORIGINAL: 0x9003,
  LITTLE_ENDIAN_INDICATOR: 0x4949,
};

const getExifDataview = async (photo) =>
  // The Exif specification states that all of the data should exist in the
  // first 64kb
  // 128kb (131072) are pulled just to be safe
  new DataView(await getArrayBufferFromFile(photo.slice(0, 131072)));

const getExifStartIndex = (dataview) =>
  findUint16InDataView(dataview, TAGS.EXIF_START, { start: 2 });

const getExifEndIndex = (dataview, exifStartIndex, isLittleEndian) =>
  exifStartIndex + 2 + dataview.getUint16(exifStartIndex + 2, isLittleEndian);

const getEndianness = (dataview, exifStartIndex) =>
  dataview.getUint16(exifStartIndex + 10) === TAGS.LITTLE_ENDIAN_INDICATOR;

const getTagIndex = (dataview, tag, exifStartIndex, isLittleEndian) =>
  findUint16InDataView(dataview, tag, {
    start: exifStartIndex + 12,
    end: getExifEndIndex(dataview, exifStartIndex, isLittleEndian),
    isLittleEndian,
  });

const getTagSize = (dataview, tagIndex, isLittleEndian) =>
  dataview.getUint16(tagIndex + 4, isLittleEndian);

/**
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
}) => {
  let tagValue = dataview.getUint16(tagIndex + 8, isLittleEndian);
  if (tagSize > 1) {
    const tiffOffset = exifStartIndex + 10;
    tagValue = getContiguousUint8Values(
      dataview,
      tagSize - 1, // ignore NULL at the end
      tagValue + tiffOffset,
    );
  }

  return tagValue;
};

const isJpeg = (dataview) =>
  dataview.byteLength >= 2 && dataview.getUint16(0) === 0xffd8;

const getJpegTag = (dataview, tag) => {
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

const parseExifDateString = (exifDate) => {
  const [date, time] = exifDate.split(' ');
  const [year, month, day] = date.split(':');
  const [hour, minute, second] = time.split(':');
  return new Date(year, month, day, hour, minute, second);
};

const getExifDate = (dataview) => {
  const tagData =
    getJpegTag(dataview, TAGS.DATETIME_ORIGINAL) ??
    getJpegTag(dataview, TAGS.DATETIME);

  return tagData && parseExifDateString(String.fromCharCode(...tagData));
};

export const getDatePhotoWasTaken = async (photo) => {
  const dataview = await getExifDataview(photo);

  return (isJpeg(dataview) && getExifDate(dataview)) || photo.lastModified;
};

export const getOrientation = async (photo) => {
  const dataview = await getExifDataview(photo);

  return (isJpeg(dataview) && getJpegTag(dataview, TAGS.ORIENTATION)) || 1;
};
