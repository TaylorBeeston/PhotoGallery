import { useRef, MutableRefObject } from 'react';
import { rotatePhoto } from 'helpers/photos/photo.helpers';
import { getDatePhotoWasTaken } from 'helpers/photos/exif.helpers';
import { PhotoFile } from 'types/photos';

type PhotoInputValues = {
  input: MutableRefObject<HTMLInputElement>;
  selectPhotos: () => void;
  addPhotos: () => Promise<void>;
  remove: (index: number) => void;
  rotate: (index: number, clockwise?: boolean) => Promise<void>;
};

const usePhotoInput = (
  onChange: (photos: PhotoFile[]) => void,
  photos: PhotoFile[],
): PhotoInputValues => {
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
      input.current.files = null;
    }
  };

  const selectPhotos = (): void => {
    input.current.click();
  };

  const remove = (index: number): void => {
    const filteredPhotos = photos.filter((_, i) => i !== index);
    onChange(filteredPhotos);
  };

  const rotate = async (index: number, clockwise = true): Promise<void> => {
    const newPhotos = [...photos];
    const rotatedPhoto = await rotatePhoto(
      photos[index].photo,
      clockwise ? 6 : 8,
    );

    newPhotos[index].photo = rotatedPhoto;
    onChange(newPhotos);
  };

  return { input, selectPhotos, addPhotos, remove, rotate };
};

export default usePhotoInput;
