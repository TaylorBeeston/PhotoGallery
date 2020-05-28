import config from '../config/config';

const { UPLOADER } = config;

const router =
  UPLOADER === 'S3'
    ? require('./S3_uploads').default
    : require('./file_uploads').default;

export default router;
