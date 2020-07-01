import { Config } from 'types/config';

export default {
  PHOTOS: {
    MAX_WIDTH: Number(process.env.PHOTO_MAX_WIDTH) || 800,
    THUMBNAIL_WIDTH: Number(process.env.PHOTO_THUMBNAIL_WIDTH) || 20,
    QUALITY: Number(process.env.PHOTO_QUALITY) || 0.9,
    THUMBNAIL_QUALITY: Number(process.env.PHOTO_THUMBNAIL_QUALITY) || 0.5,
  },
} as Partial<Config>;
