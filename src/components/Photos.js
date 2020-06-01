import React from 'react';
import usePhotos from '../hooks/usePhotos';
import Photo from './Photo';

const Photos = () => {
  const { photos } = usePhotos();

  return (
    <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 grid-flow-row-dense">
      {photos.map((photo) => (
        <Photo key={photo.id} name={photo.name} url={photo.url} />
      ))}
    </div>
  );
};

export default Photos;
