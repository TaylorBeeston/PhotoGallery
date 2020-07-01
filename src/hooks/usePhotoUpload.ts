import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  processPhoto,
  uploadPhotoToStorage,
  uploadPhotoToDatabase,
} from 'helpers/photos/photoUploaders.helpers';
import { PhotoFile } from 'types/photos';
import { useStatus } from 'contexts/StatusContext';

type PhotoUploadValues = {
  photos: PhotoFile[];
  setPhotos: (photos: PhotoFile[]) => void;
  uploadPhotos: () => Promise<void>;
};

const usePhotoUpload = (): PhotoUploadValues => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const { setMessage, clearMessage } = useStatus();
  const history = useHistory();

  const uploadPhoto = async (photo: PhotoFile): Promise<void> => {
    setMessage(`Processing ${photo.name}`);
    const {
      optimizedPhoto,
      photoName,
      thumbnail,
      thumbnailName,
    } = await processPhoto(photo.photo);

    setMessage(`Uploading ${photoName}`);
    const [photoUrl, thumbnailUrl] = await Promise.all([
      uploadPhotoToStorage(optimizedPhoto, photoName),
      uploadPhotoToStorage(thumbnail, thumbnailName),
    ]);
    setMessage(
      await uploadPhotoToDatabase(
        photoName,
        photoUrl,
        thumbnailUrl,
        photo.date.valueOf(),
      ),
    );
  };

  const uploadPhotos = async (): Promise<void> => {
    try {
      await Promise.all(photos.map(uploadPhoto));
      setTimeout(() => {
        clearMessage();
        history.push('/');
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return { photos, setPhotos, uploadPhotos };
};

export default usePhotoUpload;
