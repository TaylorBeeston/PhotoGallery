import { useState, useEffect } from 'react';
import { authFetch } from 'helpers/request.helpers';

const usePhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getPhotos = async () => {
      try {
        setStatus('Getting photos');
        setPhotos(await (await fetch('/api/photos')).json());
        setStatus('');
      } catch (err) {
        setStatus(`Error: ${err}`);
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
      setStatus(`Error deleting photo: ${response}`);
    }
  };

  return { photos, deletePhoto, status };
};

export default usePhotos;
