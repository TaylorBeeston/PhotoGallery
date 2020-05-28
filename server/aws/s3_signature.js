import { Router } from 'express';
import S3 from 'aws-sdk/clients/s3';
import withAuth from '../auth/auth';

const router = Router();

/**
 * Returns a signed S3 URL to upload a given image
 *
 * @param {string} name - Filename of stored image on S3
 * @return {string} signedRequest - Signed URL used to upload image
 * @return {string} url - URL of uploaded photo
 */
router.route('/').get(withAuth, async (req, res) => {
  const s3 = new S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  });

  const { name } = req.query;

  try {
    const data = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: name,
      ContentType: 'image/*',
      Expires: 60,
      ACL: 'public-read',
    });

    return res.status(200).json({
      signedRequest: data,
      url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${name}`,
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
