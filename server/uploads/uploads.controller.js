import config from '../config/config';

const { UPLOADER } = config;

const router =
  UPLOADER === 'S3'
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('./S3_uploads').default
    : // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('./file_uploads').default;

export default router;
