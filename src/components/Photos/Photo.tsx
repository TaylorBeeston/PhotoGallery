import React, { forwardRef, ReactEventHandler, SyntheticEvent } from 'react';
import useAnimation from 'hooks/useAnimation';
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
    const { animation, animatedEvent } = useAnimation('flip-entrance');

    const rotateSelf = (event: SyntheticEvent, clockwise?: boolean): void => {
      event.stopPropagation();
      animatedEvent(
        clockwise ? 'rotate-exit-cw' : 'rotate-exit-ccw',
        async () => {
          rotate(clockwise);
        },
        {
          endAnimation: clockwise
            ? 'rotate-entrance-cw'
            : 'rotate-entrance-ccw',
        },
      );
    };

    return (
      <div
        role="button"
        tabIndex={0}
        aria-pressed="false"
        onClick={onClick}
        onKeyDown={(e) => onClick && e.key === 'Enter' && onClick(e)}
        className={`relative w-full h-full max-h-screen rounded ${animation}`}
        ref={ref}
      >
        {deleteable && (
          <DeleteButton
            onClick={(event) => {
              event.stopPropagation();
              animatedEvent('flip-exit', remove);
            }}
            confirmation={{
              title: `Are you sure you want to delete ${name}?`,
              image: { src: url, alt: name },
            }}
          />
        )}
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
