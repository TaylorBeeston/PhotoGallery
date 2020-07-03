import React, { useState, FC, ReactEventHandler } from 'react';
import DeleteButton from 'components/UI/DeleteButton';
import PhotoLoader from 'components/Photos/PhotoLoader';

type PhotoProps = {
  name: string;
  url: string;
  thumbnail?: string;
  removePhoto: () => void;
  onClick?: ReactEventHandler;
  deleteable?: boolean;
  showName?: boolean;
};

const Photo: FC<PhotoProps> = ({
  name,
  url,
  thumbnail = '',
  removePhoto,
  onClick,
  deleteable = false,
  showName = false,
}) => {
  const [animation, setAnimation] = useState<string>('animation-flip-entrance');

  const deleteSelf: ReactEventHandler = (event) => {
    event.stopPropagation();
    setAnimation('animation-flip-exit');
    setTimeout(removePhoto, 300);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed="false"
      onClick={onClick}
      onKeyDown={(e) => onClick && e.key === 'Enter' && onClick(e)}
      className={`relative w-full h-full max-h-screen rounded ${animation} animation-once`}
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
