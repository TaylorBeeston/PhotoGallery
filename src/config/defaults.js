export default {
  PHOTOS: {
    MAX_WIDTH: process.env.PHOTO_MAX_WIDTH || 800,
    THUMBNAIL_WIDTH: process.env.PHOTO_THUMBNAIL_WIDTH || 20,
    QUALITY: process.env.PHOTO_QUALITY || 0.9,
    THUMBNAIL_QUALITY: process.env.PHOTO_THUMBNAIL_QUALITY || 0.5,
  },
};
