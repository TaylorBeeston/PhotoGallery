import React, { useState } from 'react';

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
        className="w-full h-full relative rounded"
      >
        {deleteable && (
          <button
            type="button"
            className="absolute flex items-center justify-center w-8 h-8 mt-1 ml-1 bg-red-600 rounded shadow-inner"
            onClick={removePhoto}
          >
            <span className="absolute w-6 h-1 bg-white rounded-sm transform rotate-45" />
            <span className="absolute w-6 h-1 bg-white rounded-sm transform -rotate-45" />
          </button>
        )}
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
