/* eslint-disable import/prefer-default-export */
import React, {useEffect, useRef} from 'react';
import {
  hideBlurBackground,
  showBlurBackground,
} from '../components/atom/BlurBackground/BlurBackground';

type ReturnType<T> = {
  ref: React.RefObject<T>;
  showPopup: Function;
  showByButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const usePopup = <T extends {}>(): ReturnType<T> => {
  const ref = useRef(null);

  const showPopup = () => {
    if (ref.current) {
      showBlurBackground();
      const element = ref.current as HTMLElement;
      element.dataset.isVisible = 'true';
      element.scrollTop = 0;
    }
  };

  const hidePopup = () => {
    if (ref.current) {
      hideBlurBackground();
      const element = ref.current as HTMLElement;
      element.dataset.isVisible = 'false';
    }
  };

  const showByButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = event => {
    event.stopPropagation();
    showPopup();
  };

  useEffect(() => {
    window.addEventListener('click', hidePopup);
    return () => {
      window.removeEventListener('click', hidePopup);
    };
  }, []);

  return {
    ref,
    showPopup,
    showByButtonClick,
  };
};
