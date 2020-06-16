import config from '../../config/config';

const { UPLOADER } = config;

const deletePhoto =
  UPLOADER === 'S3'
    ? require('./S3_deleter').default
    : require('./file_deleter').default;

export default deletePhoto;
