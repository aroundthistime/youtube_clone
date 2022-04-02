/* eslint-disable import/prefer-default-export */
import {useEffect, useRef, useState} from 'react';

type ReturnType = [React.RefObject<HTMLDivElement>, boolean];

export const useIsOverflowing = (): ReturnType => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const defineIsOverflowing = () => {
    if (!ref.current) return;
    const element = ref.current;
    const xOverflowing = element.clientWidth < element.scrollWidth;
    const yOverFlowing = element.clientHeight < element.scrollHeight;
    setIsOverflowing(xOverflowing || yOverFlowing);
  };

  useEffect(() => {
    defineIsOverflowing();
    window.addEventListener('resize', defineIsOverflowing);
    return () => window.removeEventListener('resize', defineIsOverflowing);
  }, [ref.current]);

  return [ref, isOverflowing];
};
