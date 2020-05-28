import React, { useState } from 'react';
import usePhotoUpload from '../hooks/usePhotoUpload';
import PhotoInput from './PhotoInput';
import StatusMessage from './StatusMessage';
import UploadToS3Icon from '../assets/images/UploadToS3Icon.svg';

const PhotoUploader = () => {
  const [uploading, setUploading] = useState(false);
  const { setPhotos, uploadPhotos, status } = usePhotoUpload();

  const clickButton = () => {
    setUploading(true);
    uploadPhotos();
  };

  return (
    <div className="photo-uploads">
      {uploading && <StatusMessage status={status} />}
      <PhotoInput onChange={setPhotos} />
      <button
        type="button"
        onClick={clickButton}
        className="flex py-4 px-8 rounded-full bg-green-300 fixed bottom-0 right-0 mr-2 mb-2 hover:bg-gray-100 border-green-600 border-4 hover:border-green-300 transition ease-in-out duration-200"
      >
        <img src={UploadToS3Icon} alt="" className="w-5 h-5 mr-2" />
        <span className="tracking-wide">Upload Photos</span>
      </button>
    </div>
  );
};

export default PhotoUploader;
