import React, { useState, useContext } from 'react';
import { LoginContext } from 'contexts/LoginContext';
import usePhotos from 'hooks/usePhotos';
import Photo from 'components/Photos/Photo';
import Lightbox from 'components/Photos/Lightbox';
import Slider from 'components/UI/Slider';
import ZoomIcon from 'assets/images/ZoomIcon.svg';
import StatusMessage from 'components/UI/StatusMessage';
import Spinner from 'components/UI/Spinner';
import NoPhotos from 'components/Photos/NoPhotos';

const Photos = () => {
  const { photos, deletePhoto, status } = usePhotos();
  const [lightbox, setLightbox] = useState(-1);
  const { isLoggedIn } = useContext(LoginContext);

  const updateZoom = (zoomValue) => {
    window.root.style.setProperty('--min-photo-size', `${zoomValue}px`);
  };

  return (
    <>
      {status && <StatusMessage status={status} />}
      {status && <Spinner />}
      {photos.length === 0 && !status && <NoPhotos />}
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
            thumbnail={photo.thumbnailUrl}
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
