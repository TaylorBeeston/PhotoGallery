import { useState, useRef, MutableRefObject } from 'react';
import { rotatePhoto } from 'helpers/photos/photo.helpers';
import { getDatePhotoWasTaken } from 'helpers/photos/exif.helpers';
import { PhotoFile } from 'types/photos';

type PhotoInputValues = {
  input: MutableRefObject<HTMLInputElement>;
  photos: PhotoFile[];
  selectPhotos: () => void;
  addPhotos: () => Promise<void>;
  removePhoto: (index: number) => void;
};

const usePhotoInput = (
  onChange: (photos: PhotoFile[]) => void,
): PhotoInputValues => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const input = useRef<HTMLInputElement>(null!);

  const addPhotos = async () => {
    if (input.current.files) {
      const newPhotos = await Promise.all(
        [...Array.from(input.current.files)].map(async (file) => ({
          photo: await rotatePhoto(file),
          name: file.name,
          date: await getDatePhotoWasTaken(file),
        })),
      );
      onChange([...photos, ...newPhotos]);
      setPhotos([...photos, ...newPhotos]);
      input.current.files = null;
    }
  };

  const selectPhotos = (): void => {
    input.current.click();
  };

  const removePhoto = (index: number): void => {
    const filteredPhotos = photos.filter((_, i) => i !== index);
    setPhotos(filteredPhotos);
    onChange(filteredPhotos);
  };

  return { input, photos, selectPhotos, addPhotos, removePhoto };
};

export default usePhotoInput;
