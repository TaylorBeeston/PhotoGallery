import React, { useState } from 'react';
import DeleteButton from 'components/UI/DeleteButton';
import PhotoLoader from './PhotoLoader';

const Photo = ({
  name = '',
  url = '',
  thumbnail = false,
  removePhoto = () => false,
  onClick = () => false,
  deleteable = false,
  showName = false,
}) => {
  const [animation, setAnimation] = useState('animation-flip-entrance');

  const deleteSelf = (e) => {
    e.stopPropagation();
    setAnimation('animation-flip-exit');
    setTimeout(removePhoto, 300);
  };

  return (
    <div
      role="button"
      tabIndex="0"
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`relative w-full h-full rounded ${animation} animation-once`}
    >
      {deleteable && <DeleteButton onClick={deleteSelf} />}
      <PhotoLoader url={url} name={name} thumbnailUrl={thumbnail} />
      {showName && (
        <h3 className="absolute bottom-0 px-2 bg-white border-l rounded-tr-lg opacity-75">
          {name}
        </h3>
      )}
    </div>
  );
};

export default Photo;
