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
  };
};

const useLightbox = ({
  startingPhoto,
  exit,
}: useLightboxParams): LightboxValues => {
  const { photos, getNextPage } = usePhotos();
  const { animation, animatedEvent } = useAnimation('flip-entrance', 100);
  const [current, setCurrent] = useState<number>(startingPhoto);

  const animatedExit = () => animatedEvent('flip-exit', exit);

  const nextPhoto = (event?: SyntheticEvent): void => {
    if (event) event.stopPropagation();
    if (photos.length > 3 && current >= photos.length - 3) getNextPage();

    if (current === photos.length - 1) {
      animatedExit();
    } else {
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
    if (event) event.stopPropagation();

    animatedEvent(
      'slide-exit-right',
      () => setCurrent((oldCurrent) => Math.max(0, oldCurrent - 1)),
      { endAnimation: 'slide-entrance-right' },
    );
  };

  const controls = {
    rightArrow: current < photos.length - 1,
    leftArrow: current > 0,
    nextPhoto,
    previousPhoto,
  };

  return {
    animation: { animation, animatedExit },
    photo: {
      url: photos[current].url,
      name: photos[current].name,
      date: new Date(photos[current].date),
    },
    controls,
  } as const;
};

export default useLightbox;
