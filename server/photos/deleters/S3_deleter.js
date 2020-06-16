import S3 from 'aws-sdk/clients/s3';
import Photo from '../photo.model';

/**
 * Deletes a file from both the db and S3
 *
 * @function deletePhoto
 * @param {number} id - Database id of photo
 */
const deletePhoto = async (id) => {
  const s3 = new S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  });

  const { name } = await Photo.findOne({ _id: id });
  await Promise.all([
    new Promise((resolve, reject) =>
      s3.deleteObject(
        { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: name },
        (error, data) => (error ? reject(error) : resolve(data)),
      ),
    ),
    Photo.deleteOne({ _id: id }),
  ]);
};

export default deletePhoto;
