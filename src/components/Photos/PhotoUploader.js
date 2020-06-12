import React, { useState } from 'react';
import usePhotoUpload from 'hooks/usePhotoUpload';
import PhotoInput from 'components/Photos/PhotoInput';
import StatusMessage from 'components/UI/StatusMessage';
import UploadToS3Icon from 'assets/images/UploadToS3Icon.svg';
import Button from 'components/UI/Button';

const PhotoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const { setPhotos, uploadPhotos, status } = usePhotoUpload();

  const startUpload = () => {
    setUploading(true);
    uploadPhotos();
  };

  return (
    <div className="photo-uploads">
      {uploading && <StatusMessage status={status} />}
      <PhotoInput onChange={setPhotos} />
      <Button onClick={startUpload} text="Upload Photos">
        <img src={UploadToS3Icon} alt="" />
      </Button>
    </div>
  );
};

export default PhotoUploader;
