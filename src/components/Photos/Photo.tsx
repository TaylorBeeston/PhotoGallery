import React, {
  useState,
  forwardRef,
  ReactEventHandler,
  SyntheticEvent,
} from 'react';
import DeleteButton from 'components/UI/DeleteButton';
import ToolTray from 'components/UI/ToolTray';
import PhotoLoader from 'components/Photos/PhotoLoader';

type PhotoProps = {
  name: string;
  url: string;
  thumbnail?: string;
  remove(): void;
  rotate?(clockwise?: boolean): Promise<void>;
  onClick?: ReactEventHandler;
  deleteable?: boolean;
  showName?: boolean;
  rotatable?: boolean;
};

const Photo = forwardRef<HTMLDivElement, PhotoProps>(
  (
    {
      name,
      url,
      thumbnail = '',
      remove,
      rotate = async () => false,
      onClick,
      deleteable = false,
      showName = false,
      rotatable = false,
    },
    ref,
  ) => {
    const [animation, setAnimation] = useState<string>(
      'animation-flip-entrance',
    );

    const deleteSelf: ReactEventHandler = (event) => {
      event.stopPropagation();
      setAnimation('animation-flip-exit');
      setTimeout(remove, 300);
    };

    const rotateSelf = (event: SyntheticEvent, clockwise?: boolean): void => {
      event.stopPropagation();
      setAnimation(
        clockwise ? 'animation-rotate-exit-cw' : 'animation-rotate-exit-ccw',
      );
      setTimeout(async () => {
        setAnimation('opacity-0');
        await rotate(clockwise);
        setAnimation(
          clockwise
            ? 'animation-rotate-entrance-cw'
            : 'animation-rotate-entrance-ccw',
        );
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
        ref={ref}
      >
        {deleteable && <DeleteButton onClick={deleteSelf} />}
        {rotatable && <ToolTray rotate={rotateSelf} />}

        <PhotoLoader url={url} name={name} thumbnailUrl={thumbnail} />

        {showName && (
          <h3 className="absolute bottom-0 px-2 bg-white border-l rounded-tr-lg opacity-75">
            {name}
          </h3>
        )}
      </div>
    );
  },
);

export default Photo;
