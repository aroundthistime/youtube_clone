/* eslint-disable import/prefer-default-export */
import React, {LegacyRef, useEffect, useRef} from 'react';
import {
  hideBlurBackground,
  showBlurBackground,
} from '../components/atom/BlurBackground/BlurBackground';

const VISIBLE_POPUP_CLASSNAME = 'popup--visible';

type ReturnType<T> = {
  ref: React.RefObject<T>;
  showPopup: Function;
};

export const usePopup = <T extends {}>(): ReturnType<T> => {
  const ref = useRef(null);

  const showPopup = () => {
    if (ref.current) {
      showBlurBackground();
      const element = ref.current as HTMLElement;
      element.scrollTop = 0;
      // element.scrollTo({top: 0});
      element.classList.add(VISIBLE_POPUP_CLASSNAME);
    }
  };

  const hidePopup = () => {
    if (ref.current) {
      hideBlurBackground();
      const element = ref.current as HTMLElement;
      element.classList.remove(VISIBLE_POPUP_CLASSNAME);
    }
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
  };
};
