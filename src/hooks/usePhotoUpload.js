import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPhotoAndThumbnail } from 'helpers/photoOptimizer.helpers';
import { authFetchJson, authFetchText } from 'helpers/request.helpers';

const usePhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const history = useHistory();

  const clearStatus = () => setStatus('');

  const processPhoto = async (photo) => {
    setStatus(`Processing ${photo.name}`);
    const { optimizedPhoto, thumbnail } = await getPhotoAndThumbnail(photo);
    const name = photo.name.replace(/\..*/, '.jpeg');
    const thumbnailName = `thumb_${name}`;

    return { optimizedPhoto, name, thumbnail, thumbnailName };
  };

  const sendPhotoToStorage = async (photo, name) => {
    setStatus(`Uploading ${name}`);
    const { signedRequest, url } = await authFetchJson(
      `/api/uploads?name=${name}`,
    );
    await fetch(signedRequest, { method: 'PUT', body: photo });

    return url;
  };

  const addPhotoToDatabase = async (name, url, thumbnailUrl) => {
    setStatus(
      await authFetchText('/api/photos', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          name,
          url,
          thumbnailUrl,
        }),
      }),
    );
  };

  const uploadPhoto = async (photo) => {
    const {
      optimizedPhoto,
      name,
      thumbnail,
      thumbnailName,
    } = await processPhoto(photo);

    const [photoUrl, thumbnailUrl] = await Promise.all([
      sendPhotoToStorage(optimizedPhoto, name),
      sendPhotoToStorage(thumbnail, thumbnailName),
    ]);
    await addPhotoToDatabase(name, photoUrl, thumbnailUrl);
  };

  const uploadPhotos = async () => {
    try {
      await Promise.all(photos.map(uploadPhoto));
      setTimeout(() => history.push('/'), 1000);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return { photos, setPhotos, uploadPhotos, status, clearStatus };
};

export default usePhotoUpload;
