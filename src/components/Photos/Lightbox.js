import React from 'react';
import useLightbox from '../../hooks/useLightbox';
import DeleteButton from '../UI/DeleteButton';
import RightArrow from '../UI/RightArrow';
import LeftArrow from '../UI/LeftArrow';

const Lightbox = ({ photos, exit, startingPhoto }) => {
  const {
    animation,
    animatedExit,
    nextPhoto,
    previousPhoto,
    current,
  } = useLightbox({ startingPhoto, exit });

  return (
    <div
      role="button"
      tabIndex="0"
      aria-pressed="true"
      onClick={current < photos.length - 1 ? nextPhoto : animatedExit}
      className="fixed top-0 left-0 z-10 flex w-screen min-h-screen flex-center"
    >
      <div className="absolute w-full h-full bg-black opacity-75" />
      <DeleteButton onClick={animatedExit} />
      {current < photos.length - 1 && <RightArrow onClick={nextPhoto} />}
      {current > 0 && <LeftArrow onClick={previousPhoto} />}
      <img
        src={photos[current].url}
        alt={photos[current].name}
        className={`relative z-20 w-screen md:h-screen md:w-auto ${animation} animation-once`}
      />
      <a
        href={photos[current].url}
        onClick={(e) => e.stopPropagation()}
        download
        className="fixed-ui-component hoverable-green-ui-component fixed-br z-30 opacity-50 hover:opacity-100"
      >
        Download
      </a>
    </div>
  );
};

export default Lightbox;
