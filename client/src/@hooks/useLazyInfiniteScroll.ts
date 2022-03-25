/* eslint-disable import/prefer-default-export */
import {useEffect} from 'react';
import {loadLazyImage} from '../components/partial/LazyImage/LazyImage';
import useInterSectionObserver from './useIntersectionObserver';

export const useLazyInfiniteScroll = (
  items: undefined | any[],
  elementClassName: string,
  fetchNextPage: Function,
  canFetchNextPage: boolean,
) => {
  const [observer, setElements, entries] = useInterSectionObserver();

  useEffect(() => {
    if (items && items.length > 0) {
      const itemElements = Array.from(
        document.getElementsByClassName(elementClassName),
      );
      setElements(itemElements);
    }
  }, [setElements, items]);

  useEffect(() => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const lazyImages = targetElement.querySelectorAll('.lazy-image');
        lazyImages.forEach(lazyImage => {
          if (lazyImage.tagName === 'IMG') {
            loadLazyImage(lazyImage as HTMLImageElement);
          }
        });

        observer?.unobserve(targetElement);
        if (entries.length - 1 === index && canFetchNextPage) {
          fetchNextPage();
        }
      }
    });
  }, [entries, observer]);
};
