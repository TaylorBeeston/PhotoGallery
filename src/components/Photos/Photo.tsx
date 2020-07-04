import React, { useState, FC, ReactEventHandler } from 'react';
import DeleteButton from 'components/UI/DeleteButton';
import RotateButton from 'components/UI/RotateButton';
import PhotoLoader from 'components/Photos/PhotoLoader';

type PhotoProps = {
  name: string;
  url: string;
  thumbnail?: string;
  remove: () => void;
  rotate?: () => Promise<void>;
  onClick?: ReactEventHandler;
  deleteable?: boolean;
  showName?: boolean;
  rotatable?: boolean;
};

const Photo: FC<PhotoProps> = ({
  name,
  url,
  thumbnail = '',
  remove,
  rotate = async () => false,
  onClick,
  deleteable = false,
  showName = false,
  rotatable = false,
}) => {
  const [animation, setAnimation] = useState<string>('animation-flip-entrance');

  const deleteSelf: ReactEventHandler = (event) => {
    event.stopPropagation();
    setAnimation('animation-flip-exit');
    setTimeout(remove, 300);
  };

  const rotateSelf: ReactEventHandler = (event) => {
    event.stopPropagation();
    setAnimation('animation-rotate-exit');
    setTimeout(async () => {
      setAnimation('opacity-0');
      await rotate();
      setAnimation('animation-rotate-entrance');
    }, 300);
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
      {rotatable && <RotateButton onClick={rotateSelf} />}

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
