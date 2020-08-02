import { useState, useEffect, MutableRefObject } from 'react';
import { Photo } from 'types/photos';
import { useStatus } from 'contexts/StatusContext';
import { authFetch } from 'helpers/request.helpers';
import useInfiniteScroll from 'hooks/useInfiniteScroll';

export type PhotosValues = {
  photos: Photo[];
  isLoading: boolean;
  getNextPage(): void;
  requestTriggeringElement: MutableRefObject<HTMLDivElement>;
  deletePhoto(id: string): Promise<void>;
};

const usePhotosState = (): PhotosValues => {
  const { setMessage, clearMessage } = useStatus();
  const {
    currentPage,
    setMoreToLoad,
    isLoading,
    setLoading,
    requestTriggeringElement,
    getNextPage,
  } = useInfiniteScroll();
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

  return {
    photos,
    isLoading,
    getNextPage,
    requestTriggeringElement,
    deletePhoto,
  } as const;
};

export default usePhotosState;
