import React, { FC } from 'react';
import Hammer from 'react-hammerjs';
import useLightbox from 'hooks/useLightbox';
import DeleteButton from 'components/UI/DeleteButton';
import RightArrow from 'components/UI/RightArrow';
import LeftArrow from 'components/UI/LeftArrow';

type LightboxProps = {
  exit(): void;
  startingPhoto: number;
};

const Lightbox: FC<LightboxProps> = ({ exit, startingPhoto }) => {
  const { animation, photo, controls } = useLightbox({
    startingPhoto,
    exit,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed="true"
      onClick={(event) => {
        if (event.type === 'click') controls.nextPhoto();
      }}
      className="fixed top-0 left-0 z-10 flex w-screen min-h-screen flex-center"
    >
      <div className="absolute w-full h-full bg-black bg-opacity-75 backdrop-blur" />
      <DeleteButton onClick={animation.animatedExit} />
      {controls.rightArrow && <RightArrow onClick={controls.nextPhoto} />}
      {controls.leftArrow && <LeftArrow onClick={controls.previousPhoto} />}
      <Hammer
        onSwipeLeft={() => controls.nextPhoto()}
        onSwipeRight={() => controls.previousPhoto()}
        onPan={animation.panHandler}
        recognizeWith={{ swipe: 'pan' }}
      >
        <img
          src={photo.url}
          alt={photo.name}
          className={`relative z-20 max-h-screen max-w-screen object-cover h-auto w-screen md:h-screen md:w-auto transition-transform duration-75 ${animation.animation}`}
        />
      </Hammer>
      <span className="z-30 p-2 mb-4 ml-4 text-white rounded frosted-glass-dark fixed-bl">
        {photo.date.toLocaleDateString()}
      </span>
      <a
        href={photo.url}
        onClick={(event) => event.stopPropagation()}
        download
        className="z-30 bg-opacity-50 btn btn-green fixed-br hover:bg-opacity-75 backdrop-blur"
      >
        Download
      </a>
    </div>
  );
};

export default Lightbox;
