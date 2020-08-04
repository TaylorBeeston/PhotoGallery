import { useState } from 'react';
import { Animations } from 'types/animations';

export type AnimatedEvent = (
  startAnimation: Animations,
  event: () => void | Promise<void>,
  options?: {
    delay?: number;
    endAnimation?: Animations;
  },
) => void;

type AnimationValues = {
  animation: string;
  animatedEvent: AnimatedEvent;
  setAnimation(animation: Animations): void;
  setDuration(duration: number): void;
};

const useAnimation = (
  startingAnimation: Animations,
  defaultDuration = 300,
  once = true,
): AnimationValues => {
  const [animation, setAnimation] = useState<Animations>(startingAnimation);
  const [duration, setDuration] = useState<number>(defaultDuration);

  const animatedEvent: AnimatedEvent = (startAnimation, event, options) => {
    setAnimation(startAnimation);
    setTimeout(async () => {
      await event();
      if (options?.endAnimation) setAnimation(options.endAnimation);
    }, options?.delay ?? duration);
  };

  return {
    animation: `animation-${animation} animation-${duration / 1000}s ${
      once ? 'animation-once' : ''
    }`,
    animatedEvent,
    setAnimation,
    setDuration,
  } as const;
};

export default useAnimation;
