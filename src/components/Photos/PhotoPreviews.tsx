import React, { FC } from 'react';
import Photo from 'components/Photos/Photo';
import { PhotoFile } from 'types/photos';

type PhotoPreviewsProps = {
  photos: PhotoFile[];
  removePhoto: (index: number) => void;
};

const PhotoPreviews: FC<PhotoPreviewsProps> = ({ photos, removePhoto }) => {
  if (photos.length === 0) return <></>;

  return (
    <div className="justify-center p-4 m-4 bg-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <Photo
          key={photo.name}
          name={photo.name}
          url={URL.createObjectURL(photo.photo)}
          removePhoto={() => removePhoto(index)}
          deleteable
          showName
        />
      ))}
    </div>
  );
};

export default PhotoPreviews;
