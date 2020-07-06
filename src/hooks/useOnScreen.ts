import { useState, useEffect, MutableRefObject } from 'react';

const useOnScreen = (
  ref: MutableRefObject<HTMLElement>,
  rootMargin = '0px',
): boolean => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin },
    );

    if (element) {
      observer.observe(ref.current);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
    // eslint-disable-next-line
  }, [ref, ref.current, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
