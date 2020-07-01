import React, { FC } from 'react';
import Icon from 'assets/images/UploadIcon.svg';
import PhotoPreviews from 'components/Photos/PhotoPreviews';
import usePhotoInput from 'hooks/usePhotoInput';
import { PhotoFile } from 'types/photos';

const PhotoInput: FC<{ onChange: (photos: PhotoFile[]) => void }> = ({
  onChange,
}) => {
  const { input, photos, selectPhotos, addPhotos, removePhoto } = usePhotoInput(
    onChange,
  );

  return (
    <div className="flex flex-col w-full h-full flex-center">
      <button type="button" onClick={selectPhotos} className="card">
        <img src={Icon} alt="Click Here To Add Photos" />
        <h3 className="text-xl">Click Here To Add Photos</h3>
      </button>
      <input
        name="photos"
        ref={input}
        type="file"
        multiple
        onChange={addPhotos}
        className="hidden"
        accept="image/*"
      />
      <PhotoPreviews photos={photos} removePhoto={removePhoto} />
    </div>
  );
};

export default PhotoInput;
