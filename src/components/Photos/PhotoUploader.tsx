import React, { FC } from 'react';
import usePhotoUpload from 'hooks/usePhotoUpload';
import PhotoInput from 'components/Photos/PhotoInput';
import StatusMessage from 'components/UI/StatusMessage';
import UploadToS3Icon from 'assets/images/UploadToS3Icon.svg';
import Button from 'components/UI/Button';

const PhotoUploader: FC = () => {
  const { setPhotos, uploadPhotos, status } = usePhotoUpload();

  return (
    <div className="photo-uploads">
      {status && <StatusMessage status={status} />}
      <PhotoInput onChange={setPhotos} />
      <Button
        onClick={uploadPhotos}
        text="Upload Photos"
        icon={UploadToS3Icon}
      />
    </div>
  );
};

export default PhotoUploader;
