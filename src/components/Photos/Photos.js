import React, { useState, useContext } from 'react';
import { LoginContext } from 'contexts/LoginContext';
import usePhotos from 'hooks/usePhotos';
import Photo from 'components/Photos/Photo';
import Lightbox from 'components/Photos/Lightbox';
import Slider from 'components/UI/Slider';
import ZoomIcon from 'assets/images/ZoomIcon.svg';

const Photos = () => {
  const { photos, deletePhoto } = usePhotos();
  const [lightbox, setLightbox] = useState(-1);
  const { isLoggedIn } = useContext(LoginContext);

  const updateZoom = (zoomValue) => {
    window.root.style.setProperty('--min-photo-size', `${zoomValue}px`);
  };

  return (
    <>
      {lightbox > -1 && (
        <Lightbox
          photos={photos}
          startingPhoto={lightbox}
          exit={() => setLightbox(-1)}
        />
      )}
      <div className={`p-2 photo-grid ${lightbox > -1 ? 'hidden' : ''}`}>
        {photos.map((photo, index) => (
          <Photo
            key={photo.id}
            name={photo.name}
            url={photo.url}
            onClick={() => setLightbox(index)}
            removePhoto={() => deletePhoto(photo.id)}
            deleteable={isLoggedIn}
          />
        ))}
      </div>
      {lightbox === -1 && (
        <Slider min={30} max={300} defaultValue={240} onChange={updateZoom}>
          <img src={ZoomIcon} alt="zoom" />
        </Slider>
      )}
    </>
  );
};

export default Photos;