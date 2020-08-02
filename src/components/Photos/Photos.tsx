import React, { FC } from 'react';
import usePhotosIndex from 'hooks/usePhotosIndex';
import Lightbox from 'components/Photos/Lightbox';
import Slider from 'components/UI/Slider';
import ZoomIcon from 'assets/images/ZoomIcon.svg';
import Spinner from 'components/UI/Spinner';
import NoPhotos from 'components/Photos/NoPhotos';

const Photos: FC = () => {
  const {
    photoComponents,
    thereIsNoPhotos,
    updateZoom,
    isLoading,
    lightbox,
  } = usePhotosIndex();

  if (thereIsNoPhotos) return <NoPhotos />;

  return (
    <>
      {lightbox.isShown && (
        <Lightbox startingPhoto={lightbox.startingPhoto} exit={lightbox.hide} />
      )}

      <div className={`p-2 photo-grid ${lightbox.isShown ? 'hidden' : ''}`}>
        {photoComponents}
      </div>

      {isLoading && (
        <div className="h-20 bg-gray-900 bg-opacity-25 card">
          <Spinner />
        </div>
      )}

      {!lightbox.isShown && (
        <Slider
          min={15}
          max={60}
          defaultValue={15}
          onChange={updateZoom}
          icon={ZoomIcon}
        />
      )}
    </>
  );
};

export default Photos;
