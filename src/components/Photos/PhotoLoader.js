import React, { useState } from 'react';
import Spinner from 'components/UI/Spinner';

const PhotoLoader = ({ url, name, thumbnailUrl = false }) => {
  const [loading, setLoading] = useState(!!thumbnailUrl);

  return (
    <>
      {loading && (
        <div className="absolute flex w-full h-full flex-center">
          <img
            src={thumbnailUrl}
            alt={`loading_${name}`}
            className="object-cover w-full h-full border rounded shadow border-gray-600"
          />
          <div className="absolute">
            <Spinner />
          </div>
        </div>
      )}
      <img
        src={url}
        alt={name}
        className={`object-cover w-full h-full border rounded shadow border-gray-600 ${
          loading && 'opacity-0'
        }`}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default PhotoLoader;
