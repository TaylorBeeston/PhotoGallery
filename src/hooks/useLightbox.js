import { useState } from 'react';

const useLightbox = ({ startingPhoto, exit }) => {
  const [animation, setAnimation] = useState('animation-flip-entrance');
  const [current, setCurrent] = useState(startingPhoto);

  const animatedExit = (e) => {
    e.stopPropagation();
    setAnimation('animation-flip-exit');
    setTimeout(exit, 300);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrent(current + 1);
  };

  const previousPhoto = (e) => {
    e.stopPropagation();
    setCurrent(current - 1);
  };

  return { animation, animatedExit, nextPhoto, previousPhoto, current };
};

export default useLightbox;
