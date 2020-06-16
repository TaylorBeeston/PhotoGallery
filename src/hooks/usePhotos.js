import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        setPhotos(await (await fetch('/api/photos')).json());
      } catch (err) {
        console.log(err);
        setTimeout(getPhotos, 1000);
      }
    };

    getPhotos();
  }, []);

  const deletePhoto = async (id) => {
    const response = await authFetch(`/api/photos/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      setPhotos(photos.filter((photo) => photo.id !== id));
    } else {
      console.log(response);
    }
  };

  return { photos, deletePhoto };
};

export default usePhotos;
