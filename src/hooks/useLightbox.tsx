import React, { useState, FC, ReactNodeArray } from 'react';
import Hammer from 'react-hammerjs';
import { usePhotos } from 'contexts/PhotosContext';
import RightArrow from 'components/UI/RightArrow';
import LeftArrow from 'components/UI/LeftArrow';
import DeleteButton from 'components/UI/DeleteButton';

type useLightboxParams = {
  startingPhoto: number;
  exit(): void;
};

type LightboxValues = {
  animation: string;
  nextPhoto(): void;
  previousPhoto(): void;
  url: string;
  name: string;
  date: Date;
  controls: ReactNodeArray;
  TouchEventsWrapper: FC;
};

const useLightbox = ({
  startingPhoto,
  exit,
}: useLightboxParams): LightboxValues => {
  const { photos, getNextPage } = usePhotos();
  const [animation, setAnimation] = useState<string>('animation-flip-entrance');
  const [current, setCurrent] = useState<number>(startingPhoto);

  const animatedExit = (): void => {
    setAnimation('animation-flip-exit');
    setTimeout(exit, 300);
  };

  const nextPhoto = (): void => {
    if (current === photos.length - 1) animatedExit();
    if (photos.length > 3 && current === photos.length - 3) getNextPage();
    setCurrent((oldCurrent) => Math.min(photos.length - 1, oldCurrent + 1));
  };

  const previousPhoto = (): void => {
    setCurrent((oldCurrent) => Math.max(0, oldCurrent - 1));
  };

  const deleteButton = (
    <DeleteButton
      key="delete"
      onClick={(event) => {
        event.stopPropagation();
        animatedExit();
      }}
    />
  );

  const rightArrow = current < photos.length - 1 && (
    <RightArrow
      key="right-arrow"
      onClick={(event) => {
        event.stopPropagation();
        nextPhoto();
      }}
    />
  );

  const leftArrow = current > 0 && (
    <LeftArrow
      key="left-arrow"
      onClick={(event) => {
        event.stopPropagation();
        previousPhoto();
      }}
    />
  );

  const controls = [deleteButton, leftArrow, rightArrow];

  const TouchEventsWrapper: FC = ({ children }) => (
    <Hammer
      onSwipeUp={() => animatedExit()}
      onSwipeLeft={() => nextPhoto()}
      onSwipeRight={() => previousPhoto()}
    >
      {children}
    </Hammer>
  );

  return {
    animation,
    nextPhoto,
    previousPhoto,
    url: photos[current].url,
    name: photos[current].name,
    date: new Date(photos[current].date),
    controls,
    TouchEventsWrapper,
  } as const;
};

export default useLightbox;
