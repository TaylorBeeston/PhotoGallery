import React, { useState, FC } from 'react';
import { useLogin } from 'contexts/LoginContext';
import usePhotos from 'hooks/usePhotos';
import Photo from 'components/Photos/Photo';
import Lightbox from 'components/Photos/Lightbox';
import Slider from 'components/UI/Slider';
import ZoomIcon from 'assets/images/ZoomIcon.svg';
import StatusMessage from 'components/UI/StatusMessage';
import Spinner from 'components/UI/Spinner';
import NoPhotos from 'components/Photos/NoPhotos';

const Photos: FC = () => {
  const { photos, deletePhoto, status } = usePhotos();
  const [lightbox, setLightbox] = useState<number>(-1);
  const { isLoggedIn } = useLogin();

  const updateZoom = (zoomValue: number): void => {
    document.documentElement.style.setProperty(
      '--min-photo-size',
      `${zoomValue}px`,
    );
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
        {photos.map(({ id, name, url, thumbnailUrl }, index) => (
          <Photo
            key={id}
            name={name}
            url={url}
            thumbnail={thumbnailUrl}
            onClick={() => setLightbox(index)}
            removePhoto={() => deletePhoto(id)}
            deleteable={isLoggedIn}
          />
        ))}
      </div>

      {lightbox === -1 && (
        <Slider
          min={30}
          max={300}
          defaultValue={240}
          onChange={updateZoom}
          icon={ZoomIcon}
        />
      )}
    </>
  );
};

export default Photos;
