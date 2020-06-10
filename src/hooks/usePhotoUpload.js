import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import optimize from '../helpers/photoOptimizer.helpers';
import { authFetchJson, authFetchText } from '../helpers/request.helpers';

const usePhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const history = useHistory();

  const clearStatus = () => setStatus('');

  const uploadPhoto = async (photo) => {
    try {
      setStatus(`Shrinking ${photo.name}`);
      const optimizedPhoto = await optimize(photo);
      const name = photo.name.replace(/\..*/, '.jpeg');

      const { signedRequest, url } = await authFetchJson(
        `/api/uploads?name=${name}`,
      );

      await fetch(signedRequest, { method: 'PUT', body: optimizedPhoto });

      setStatus(
        await authFetchText('/api/photos', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name,
            url,
          }),
        }),
      );
    } catch (error) {
      setStatus(error);
    }
  };

  const uploadPhotos = async () => {
    try {
      await Promise.all(photos.map(uploadPhoto));
      setTimeout(() => history.push('/'), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return { photos, setPhotos, uploadPhotos, status, clearStatus };
};

export default usePhotoUpload;
