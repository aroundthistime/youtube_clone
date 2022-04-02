/* eslint-disable import/prefer-default-export */
import {useEffect, useState} from 'react';
import {useIsOverflowing} from './useIsOverflowing';

type ReturnType = {
  ref: React.RefObject<HTMLDivElement>;
  isOverflowing: boolean;
  showFull: boolean;
  toggleShowFull: () => void;
};

export const useToggleShowFull = (): ReturnType => {
  const [showFull, setShowFull] = useState<boolean>(false);
  const [ref, isOverflowing] = useIsOverflowing();

  const toggleShowFull = () => {
    setShowFull(prev => !prev);
  };

  useEffect(() => {
    window.addEventListener('resize', () => setShowFull(false));
    return () => window.removeEventListener('resize', () => setShowFull(false));
  }, []);

  return {
    ref,
    isOverflowing,
    showFull,
    toggleShowFull,
  };
};
