import {useState, useRef, useEffect} from 'react';

type ReturnType = [
  IntersectionObserver | null,
  React.Dispatch<React.SetStateAction<Element[]>>,
  IntersectionObserverEntry[],
];

const useInterSectionObserver = (
  options?: IntersectionObserverInit,
): ReturnType => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const {root, rootMargin, threshold} = options || {};

  useEffect(() => {
    observe();
    return () => {
      observer.current?.disconnect();
    };
  }, [elements, root, rootMargin, threshold]);

  const observe = () => {
    if (elements.length > 0) {
      observer.current = new IntersectionObserver(
        ioEntires => {
          setEntries(ioEntires);
        },
        {
          root,
          rootMargin,
          threshold,
        },
      );
      elements.forEach(element => {
        observer.current?.observe(element);
      });
    }
  };

  return [observer.current, setElements, entries];
};

export default useInterSectionObserver;
