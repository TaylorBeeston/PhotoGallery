import React, { FC } from 'react';
import createCtx from 'helpers/context.helpers';
import usePhotosState, { PhotosValues } from 'contexts/hooks/usePhotosState';

export const [usePhotos, Provider] = createCtx<PhotosValues>();

export const PhotosContextProvider: FC = ({ children }) => {
  const {
    photos,
    isLoading,
    getNextPage,
    requestTriggeringElement,
    deletePhoto,
  } = usePhotosState();

  return (
    <Provider
      value={{
        photos,
        isLoading,
        getNextPage,
        requestTriggeringElement,
        deletePhoto,
      }}
    >
      {children}
    </Provider>
  );
};
