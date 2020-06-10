import React, { useState } from 'react';
import DeleteButton from '../UI/DeleteButton';

const Photo = ({
  name,
  url,
  removePhoto,
  onClick,
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
      <img
        src={url}
        alt={name}
        className="object-cover w-full h-full border rounded shadow border-grey-600"
      />
      {showName && (
        <h3 className="absolute bottom-0 px-2 bg-white border-l rounded-tr-lg opacity-75">
          {name}
        </h3>
      )}
    </div>
  );
};

export default Photo;
