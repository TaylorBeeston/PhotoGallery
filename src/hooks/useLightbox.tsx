import { useState, SyntheticEvent } from 'react';
import { usePhotos } from 'contexts/PhotosContext';
import useAnimation from 'hooks/useAnimation';

type useLightboxParams = {
  startingPhoto: number;
  exit(): void;
};

type LightboxValues = {
  animation: {
    animation: string;
    animatedExit(): void;
  };
  photo: {
    url: string;
    name: string;
    date: Date;
  };
  controls: {
    rightArrow: boolean;
    leftArrow: boolean;
    nextPhoto(): void;
    previousPhoto(): void;
    panHandler: HammerListener;
  };
};

const useLightbox = ({
  startingPhoto,
  exit,
}: useLightboxParams): LightboxValues => {
  const { photos, getNextPage } = usePhotos();
  const [current, setCurrent] = useState<number>(startingPhoto);
  const { animation, animatedEvent } = useAnimation('flip-entrance', 100);

  const animatedExit = () => animatedEvent('slide-exit-up', exit);

  const nextPhoto = (event?: SyntheticEvent): void => {
    if (event) if (event.stopPropagation) event.stopPropagation();
    if (photos.length > 3 && current >= photos.length - 3) getNextPage();

    if (current < photos.length - 1) {
      animatedEvent(
        'slide-exit-left',
        () =>
          setCurrent((oldCurrent) =>
            Math.min(photos.length - 1, oldCurrent + 1),
          ),
        { endAnimation: 'slide-entrance-left' },
      );
    }
  };

  const previousPhoto = (event?: SyntheticEvent): void => {
    if (event) if (event.stopPropagation) event.stopPropagation();

    if (current === 0) return;

    animatedEvent(
      'slide-exit-right',
      () => setCurrent((oldCurrent) => Math.max(0, oldCurrent - 1)),
      { endAnimation: 'slide-entrance-right' },
    );
  };

  const panHandler: HammerListener = (event) => {
    event.srcEvent.stopPropagation();

    let { deltaX, deltaY } = event;
    const element = event.target;

    // don't allow pan if there are no more photos in that direction
    if (current === 0) deltaX = Math.min(deltaX, 0);
    else if (current === photos.length - 1) deltaX = Math.max(deltaX, 0);

    // only allow pan up
    deltaY = Math.min(0, deltaY);

    const deltaXPercentage = Math.abs(deltaX) / event.target.clientWidth;
    const deltaYPercentage = Math.abs(deltaY) / event.target.clientHeight;
    const translateXValue = event.isFinal ? 0 : deltaX;
    const translateYValue = event.isFinal ? 0 : Math.floor(deltaY * 0.3);
    const scaleOpacityValue = event.isFinal ? 1 : 1 - deltaYPercentage;

    const transformStyle = `translateX(${translateXValue}px) 
                            translateY(${translateYValue}px) 
                            scale(${scaleOpacityValue})`;

    if (element.style.transform !== transformStyle)
      requestAnimationFrame(() => {
        element.style.transform = transformStyle;
        element.style.opacity = scaleOpacityValue.toString();
      });

    // handle letting go of pan
    if (event.isFinal) {
      // eslint-disable-next-line no-unused-expressions
      if (deltaXPercentage > 0.2) deltaX > 0 ? previousPhoto() : nextPhoto();
      else if (deltaYPercentage > 0.2) animatedExit();
    }
  };

  const controls = {
    rightArrow: current < photos.length - 1,
    leftArrow: current > 0,
    nextPhoto,
    previousPhoto,
    panHandler,
  };

  return {
    animation: {
      animation,
      animatedExit,
    },
    photo: {
      url: photos[current].url,
      name: photos[current].name,
      date: new Date(photos[current].date),
    },
    controls,
  } as const;
};

export default useLightbox;
