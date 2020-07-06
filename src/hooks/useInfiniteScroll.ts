import { useState, useRef, MutableRefObject } from 'react';
import useOnScreen from 'hooks/useOnScreen';

type InfiniteScrollValues = {
  currentPage: number;
  setMoreToLoad(more: boolean): void;
  loading: boolean;
  setLoading(loading: boolean): void;
  requestTriggeringElement: MutableRefObject<HTMLDivElement>;
  getNextPage(): void;
};

const useInfiniteScroll = (): InfiniteScrollValues => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moreToLoad, setMoreToLoad] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const requestTriggeringElement = useRef<HTMLDivElement>(null!);
  const onScreen = useOnScreen(requestTriggeringElement, '0px');

  const getNextPage = (): void => {
    if (moreToLoad && !loading) {
      setCurrentPage((oldPage) => oldPage + 1);
      setLoading(true);
    }
  };

  if (onScreen) getNextPage();

  return {
    currentPage,
    setMoreToLoad,
    loading,
    setLoading,
    requestTriggeringElement,
    getNextPage,
  };
};

export default useInfiniteScroll;
