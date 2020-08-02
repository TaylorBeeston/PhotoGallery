import React, { ReactNodeArray } from 'react';
import { usePhotos } from 'contexts/PhotosContext';
import { useLogin } from 'contexts/LoginContext';
import useLightboxWrapper, {
  LightboxWrapperValues,
} from 'hooks/useLightboxWrapper';
import PhotoComponent from 'components/Photos/Photo';

type PhotosIndexValues = {
  photoComponents: ReactNodeArray;
  thereIsNoPhotos: boolean;
  updateZoom(zoomValue: number): void;
  isLoading: boolean;
  lightbox: LightboxWrapperValues;
};

const usePhotosIndex = (): PhotosIndexValues => {
  const { isLoggedIn } = useLogin();
  const {
    photos,
    isLoading,
    requestTriggeringElement,
    deletePhoto,
  } = usePhotos();
  const lightbox = useLightboxWrapper();

  const updateZoom = (zoomValue: number): void => {
    document.documentElement.style.setProperty(
      '--min-photo-size',
      `${zoomValue}%`,
    );
  };

  const photoComponents = photos.map(
    ({ id, name, url, thumbnailUrl }, index) => (
      <PhotoComponent
        key={id}
        name={name}
        url={url}
        thumbnail={thumbnailUrl}
        onClick={() => lightbox.show(index)}
        remove={() => deletePhoto(id)}
        deleteable={isLoggedIn}
        ref={
          photos.length > 3 && index === photos.length - 3
            ? requestTriggeringElement
            : undefined
        }
      />
    ),
  );

  const thereIsNoPhotos = photos.length === 0 && !isLoading;

  return {
    photoComponents,
    thereIsNoPhotos,
    updateZoom,
    isLoading,
    lightbox,
  } as const;
};

export default usePhotosIndex;
