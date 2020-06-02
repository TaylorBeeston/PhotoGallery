import React, { useState } from 'react';
import DeleteButton from '../UI/DeleteButton';

const Photo = ({
  name,
  url,
  removePhoto,
  deleteable = false,
  showName = false,
}) => {
  const [lightbox, setLightbox] = useState(false);
  let returnVal;

  if (lightbox) {
    returnVal = (
      <div
        role="button"
        tabIndex="0"
        aria-pressed="true"
        onClick={() => setLightbox(false)}
        className="fixed top-0 left-0 z-10 flex w-screen h-screen flex-center"
      >
        <div className="absolute w-full h-full bg-black opacity-75" />
        <img
          src={url}
          alt={name}
          className="relative z-20 w-screen md:h-screen md:w-auto"
        />
      </div>
    );
  } else {
    returnVal = (
      <div
        role="button"
        tabIndex="0"
        aria-pressed="false"
        onClick={() => setLightbox(true)}
        onKeyDown={(e) => e.key === 'Enter' && setLightbox(true)}
        className="relative w-full h-full rounded"
      >
        {deleteable && <DeleteButton onClick={removePhoto} />}
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
  }

  return returnVal;
};

export default Photo;
