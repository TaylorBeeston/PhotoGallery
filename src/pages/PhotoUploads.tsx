import React, { FC } from 'react';
import usePhotoUpload from 'hooks/usePhotoUpload';
import PhotoInput from 'components/Photos/PhotoInput';
import UploadToS3Icon from 'assets/images/UploadToS3Icon.svg';
import Button from 'components/UI/Button';

const PhotoUploads: FC = () => {
  const { photos, setPhotos, uploadPhotos } = usePhotoUpload();

  return (
    <div className="photo-uploads">
      <PhotoInput onChange={setPhotos} photos={photos} />
      <Button
        onClick={uploadPhotos}
        text="Upload Photos"
        icon={UploadToS3Icon}
      />
    </div>
  );
};

export default PhotoUploads;
