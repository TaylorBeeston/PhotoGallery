import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';
import { Photo } from 'types/photos';
import { useStatus } from 'contexts/StatusContext';

type PhotosValues = {
  photos: Photo[];
  deletePhoto: (id: string) => Promise<void>;
  loading: boolean;
};

const usePhotos = (): PhotosValues => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setMessage, clearMessage } = useStatus();

  useEffect((): void => {
    const getPhotos = async (): Promise<void> => {
      try {
        setMessage('Getting photos');
        setPhotos(await (await fetch('/api/photos')).json());
        clearMessage();
        setLoading(false);
      } catch (error) {
        setMessage(`Error: ${error}`);
        setTimeout(getPhotos, 1000);
      }
    };

    getPhotos();
    // eslint-disable-next-line
  }, []);

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

  return { photos, deletePhoto, loading } as const;
};

export default usePhotos;
