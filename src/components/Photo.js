import React, { useState } from 'react';

const Photo = ({
  name,
  url,
  removePhoto,
  deleteable = true,
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
        {deleteable && (
          <button
            type="button"
            className="absolute flex items-center justify-center w-8 h-8 mt-1 ml-1 bg-black bg-opacity-50 rounded-full shadow hover:shadow-outline transform hover:rotate-180 transition ease-in-out duration-200 text-white"
            onClick={removePhoto}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z"
                fill="currentColor"
                fillRule="nonzero"
              />
            </svg>
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
