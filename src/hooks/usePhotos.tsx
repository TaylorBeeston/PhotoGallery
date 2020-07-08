import React, { useState, useEffect, ReactNodeArray } from 'react';
import { Photo } from 'types/photos';
import { useLogin } from 'contexts/LoginContext';
import { useStatus } from 'contexts/StatusContext';
import { authFetch } from 'helpers/request.helpers';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import useLightboxWrapper, {
  LightboxWrapperValues,
} from 'hooks/useLightboxWrapper';
import PhotoComponent from 'components/Photos/Photo';

type PhotosValues = {
  photos: Photo[];
  photoComponents: ReactNodeArray;
  thereIsNoPhotos: boolean;
  updateZoom(zoomValue: number): void;
  loading: boolean;
  getNextPage(): void;
  lightbox: LightboxWrapperValues;
};

const usePhotos = (): PhotosValues => {
  const { isLoggedIn } = useLogin();
  const { setMessage, clearMessage } = useStatus();
  const {
    currentPage,
    setMoreToLoad,
    loading,
    setLoading,
    requestTriggeringElement,
    getNextPage,
  } = useInfiniteScroll();
  const lightbox = useLightboxWrapper();
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect((): void => {
    const getPhotos = async (page: number): Promise<void> => {
      try {
        const response = await fetch(`/api/photos/${page}`);

        if (response.status === 200) {
          if (currentPage === 1) setMessage('Getting photos');
          setPhotos([...photos, ...(await response.json())]);
          clearMessage();
          setLoading(false);
        } else if (response.status === 204) {
          setMoreToLoad(false);
          setLoading(false);
        } else {
          throw new Error(await response.text());
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        setTimeout(getPhotos, 1000);
      }
    };

    getPhotos(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const deletePhoto = async (id: string): Promise<void> => {
    const response = await authFetch(`/api/photos/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      setPhotos(photos.filter((photo) => photo.id !== id));
    } else {
      setMessage(`Error deleting photo: ${response}`);
      setTimeout(clearMessage, 1000);
    }
  };

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

  const thereIsNoPhotos = photos.length === 0 && !loading;

  return {
    photos,
    photoComponents,
    thereIsNoPhotos,
    updateZoom,
    loading,
    getNextPage,
    lightbox,
  } as const;
};

export default usePhotos;
