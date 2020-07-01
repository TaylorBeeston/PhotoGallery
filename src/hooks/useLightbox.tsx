import React, { useState, ReactNode, ReactEventHandler } from 'react';
import RightArrow from 'components/UI/RightArrow';
import LeftArrow from 'components/UI/LeftArrow';
import { Photo } from 'types/photos';

type useLightboxParams = {
  startingPhoto: number;
  photos: Photo[];
  exit: () => void;
};

type LightboxValues = {
  animation: string;
  animatedExit: ReactEventHandler;
  nextPhoto: ReactEventHandler;
  previousPhoto: ReactEventHandler;
  url: string;
  name: string;
  leftArrow: ReactNode;
  rightArrow: ReactNode;
};

const useLightbox = ({
  startingPhoto,
  photos,
  exit,
}: useLightboxParams): LightboxValues => {
  const [animation, setAnimation] = useState<string>('animation-flip-entrance');
  const [current, setCurrent] = useState<number>(startingPhoto);

  const animatedExit: ReactEventHandler = (event) => {
    event.stopPropagation();
    setAnimation('animation-flip-exit');
    setTimeout(exit, 300);
  };

  const nextPhoto: ReactEventHandler = (event) => {
    event.stopPropagation();
    if (current + 1 === photos.length) animatedExit(event);
    setCurrent((oldCurrent) => Math.min(photos.length - 1, oldCurrent + 1));
  };

  const previousPhoto: ReactEventHandler = (event) => {
    event.stopPropagation();
    setCurrent((oldCurrent) => Math.max(0, oldCurrent - 1));
  };

  const rightArrow = current < photos.length - 1 && (
    <RightArrow onClick={nextPhoto} />
  );

  const leftArrow = current > 0 && <LeftArrow onClick={previousPhoto} />;

  return {
    animation,
    animatedExit,
    nextPhoto,
    previousPhoto,
    url: photos[current].url,
    name: photos[current].name,
    leftArrow,
    rightArrow,
  } as const;
};

export default useLightbox;
