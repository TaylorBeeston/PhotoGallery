import React, { FC } from 'react';
import usePhotos from 'hooks/usePhotos';
import Lightbox from 'components/Photos/Lightbox';
import Slider from 'components/UI/Slider';
import ZoomIcon from 'assets/images/ZoomIcon.svg';
import Spinner from 'components/UI/Spinner';
import NoPhotos from 'components/Photos/NoPhotos';

const Photos: FC = () => {
  const {
    photos,
    photoComponents,
    thereIsNoPhotos,
    updateZoom,
    loading,
    getNextPage,
    lightbox,
  } = usePhotos();

  if (thereIsNoPhotos) return <NoPhotos />;

  return (
    <>
      {lightbox.isShown && (
        <Lightbox
          photos={photos}
          startingPhoto={lightbox.startingPhoto}
          exit={lightbox.hide}
          getNextPage={getNextPage}
        />
      )}

      <div className={`p-2 photo-grid ${lightbox.isShown ? 'hidden' : ''}`}>
        {photoComponents}
      </div>

      {loading && (
        <div className="h-20 bg-gray-900 bg-opacity-25 card">
          <Spinner />
        </div>
      )}

      {!lightbox.isShown && (
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
