import React, { useState, useRef } from 'react';
import Icon from 'assets/images/UploadIcon.svg';
import Photo from 'components/Photos/Photo';

const PhotoInput = ({ onChange }) => {
  const [photos, setPhotos] = useState([]);
  const input = useRef(null);

  const handleChange = () => {
    onChange([...photos, ...input.current.files]);
    setPhotos([...photos, ...input.current.files]);
    input.current.files = null;
  };

  const addPhotos = () => {
    input.current.click();
  };

  const removePhoto = (index) => {
    const filteredPhotos = photos.filter((photo, i) => i !== index);
    setPhotos(filteredPhotos);
    onChange(filteredPhotos);
  };

  const previews = photos.length > 0 && (
    <div className="justify-center p-4 m-4 bg-gray-100 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <Photo
          key={photo.name}
          name={photo.name}
          url={URL.createObjectURL(photo)}
          removePhoto={() => removePhoto(index)}
          deleteable
          showName
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full flex-center">
      <button type="button" onClick={addPhotos} className="card">
        <img src={Icon} alt="Click Here To Add Photos" />
        <h3 className="text-xl">Click Here To Add Photos</h3>
      </button>
      <input
        name="photos"
        ref={input}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      {previews}
    </div>
  );
};

export default PhotoInput;
