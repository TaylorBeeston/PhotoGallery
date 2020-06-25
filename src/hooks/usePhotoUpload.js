import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  processPhoto,
  uploadPhotoToStorage,
  uploadPhotoToDatabase,
} from 'helpers/photos/photoUploaders.helpers';

const usePhotoUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');
  const history = useHistory();

  const clearStatus = () => setStatus('');

  const uploadPhoto = async (photo) => {
    setStatus(`Processing ${photo.name}`);
    const {
      optimizedPhoto,
      photoName,
      thumbnail,
      thumbnailName,
    } = await processPhoto(photo.photo);

    setStatus(`Uploading ${photoName}`);
    const [photoUrl, thumbnailUrl] = await Promise.all([
      uploadPhotoToStorage(optimizedPhoto, photoName),
      uploadPhotoToStorage(thumbnail, thumbnailName),
    ]);
    setStatus(
      await uploadPhotoToDatabase(
        photoName,
        photoUrl,
        thumbnailUrl,
        photo.date.valueOf(),
      ),
    );
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
