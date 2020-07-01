import React, { useState, FC } from 'react';
import Spinner from 'components/UI/Spinner';

type PhotoLoaderProps = {
  url: string;
  name: string;
  thumbnailUrl: string;
};

const PhotoLoader: FC<PhotoLoaderProps> = ({
  url,
  name,
  thumbnailUrl = '',
}) => {
  const [loading, setLoading] = useState<boolean>(!!thumbnailUrl);

  return (
    <>
      {loading && (
        <div className="absolute flex w-full h-full flex-center">
          <img
            src={thumbnailUrl}
            alt={`loading_${name}`}
            className="object-cover w-full h-full border border-gray-600 rounded shadow"
          />
          <div className="absolute">
            <Spinner />
          </div>
        </div>
      )}

      <img
        src={url}
        alt={name}
        className={`object-cover w-full h-full border rounded shadow border-gray-600 min-h-32 ${
          loading && 'opacity-0'
        }`}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default PhotoLoader;
