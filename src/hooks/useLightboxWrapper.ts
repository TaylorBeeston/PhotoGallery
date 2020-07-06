import { useState } from 'react';

export type LightboxWrapperValues = {
  show(index: number): void;
  hide(): void;
  startingPhoto: number;
  isShown: boolean;
};

const useLightboxWrapper = (): LightboxWrapperValues => {
  const [lightbox, setLightbox] = useState<number>(-1);

  const show = (index: number): void => {
    if (index < 0) throw new Error('Invalid photo index');
    setLightbox(index);
  };

  const hide = (): void => {
    setLightbox(-1);
  };

  const startingPhoto = lightbox;
  const isShown = lightbox > -1;

  return { show, hide, startingPhoto, isShown };
};

export default useLightboxWrapper;
