import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const usePhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const history = useHistory();

  const clearStatus = () => setStatus('');

  const uploadPhoto = async (photo) => {
    setStatus(`Uploading ${photo.name}...`);
    const { signedRequest, url } = await (
      await fetch(`/api/sign-s3?name=${photo.name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
    ).json();

    try {
      await fetch(signedRequest, { method: 'PUT', body: photo });

      setStatus(
        await (
          await fetch('/api/photos', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              name: photo.name,
              url,
            }),
          })
        ).text(),
      );
    } catch (err) {
      setStatus(err);
    }
  };

  const uploadPhotos = () => {
    photos.forEach(uploadPhoto);
    setTimeout(() => history.push('/'), 3000);
  };

  return { photos, setPhotos, uploadPhotos, status, clearStatus };
};

export default usePhotoUpload;
