interface PhotosConfig {
  MAX_WIDTH: number;
  THUMBNAIL_WIDTH: number;
  QUALITY: number;
  THUMBNAIL_QUALITY: number;
}

export interface Config {
  PHOTOS: PhotosConfig;
  ENV: string;
}
