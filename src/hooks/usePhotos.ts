import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';
import { Photo } from 'types/photos';

type PhotosValues = {
  photos: Photo[];
  deletePhoto: (id: string) => Promise<void>;
  status: string;
};

const usePhotos = (): PhotosValues => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<string>('');

  useEffect((): void => {
    const getPhotos = async (): Promise<void> => {
      try {
        setStatus('Getting photos');
        setPhotos(await (await fetch('/api/photos')).json());
        setStatus('');
      } catch (error) {
        setStatus(`Error: ${error}`);
        setTimeout(getPhotos, 1000);
      }
    };

    getPhotos();
  }, []);

  const deletePhoto = async (id: string): Promise<void> => {
    const response = await authFetch(`/api/photos/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      setPhotos(photos.filter((photo) => photo.id !== id));
    } else {
      setStatus(`Error deleting photo: ${response}`);
    }
  };

  return { photos, deletePhoto, status } as const;
};

export default usePhotos;
