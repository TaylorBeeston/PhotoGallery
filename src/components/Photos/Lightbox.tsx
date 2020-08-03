import React, { FC } from 'react';
import useLightbox from 'hooks/useLightbox';

type LightboxProps = {
  exit(): void;
  startingPhoto: number;
};

const Lightbox: FC<LightboxProps> = ({ exit, startingPhoto }) => {
  const {
    animation,
    nextPhoto,
    url,
    name,
    date,
    controls,
    TouchEventsWrapper,
  } = useLightbox({
    startingPhoto,
    exit,
  });

  return (
    <TouchEventsWrapper>
      <div
        role="button"
        tabIndex={0}
        aria-pressed="true"
        onClick={(event) => {
          event.stopPropagation();
          nextPhoto();
        }}
        className="fixed top-0 left-0 z-10 flex w-screen min-h-screen flex-center"
      >
        <div className="absolute w-full h-full bg-black bg-opacity-75 backdrop-blur" />
        {controls}
        <img
          src={url}
          alt={name}
          className={`relative z-20 max-h-screen max-w-screen object-cover h-auto w-screen md:h-screen md:w-auto ${animation} animation-once`}
        />
        <span className="z-30 p-2 mb-4 ml-4 text-white rounded frosted-glass-dark fixed-bl">
          {date.toLocaleDateString()}
        </span>
        <a
          href={url}
          onClick={(event) => event.stopPropagation()}
          download
          className="z-30 bg-opacity-50 btn btn-green fixed-br hover:bg-opacity-75 backdrop-blur"
        >
          Download
        </a>
      </div>
    </TouchEventsWrapper>
  );
};

export default Lightbox;
