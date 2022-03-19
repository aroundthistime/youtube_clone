/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import {LegacyRef, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {UserState} from '../../../@modules/userSlice';
import {
  hideBlurBackground,
  showBlurBackground,
} from '../../atom/BlurBackground/BlurBackground';

type ReturnType = {
  user: UserState;
  ref: LegacyRef<HTMLElement> | undefined;
};

const VISIBLE_MOBILE_NAV_CLASSNAME = 'nav--mobile-visible';
const HIDDEN_MOBILE_NAV_CLASSNAME = 'nav--mobile-hidden';

export const showMobileNav = (element: HTMLElement | undefined | null) => {
  if (element) {
    showBlurBackground();
    element.scrollTop = 0;
    element.classList.add(VISIBLE_MOBILE_NAV_CLASSNAME);
    element.classList.remove(HIDDEN_MOBILE_NAV_CLASSNAME);
  }
};

export const hideMobileNav = (element: HTMLElement | undefined | null) => {
  if (element) {
    element.classList.remove(VISIBLE_MOBILE_NAV_CLASSNAME);
    element.classList.add(HIDDEN_MOBILE_NAV_CLASSNAME);
    hideBlurBackground();
  }
};

export const useNav = (): ReturnType => {
  const user = useSelector((state: RootState) => state.user);
  const ref = useRef<HTMLElement>(null);

  const requestHideMobileNav = (event: MouseEvent) => {
    hideMobileNav(ref.current);
  };

  useEffect(() => {
    window.addEventListener('click', requestHideMobileNav);
    return () => {
      window.removeEventListener('click', requestHideMobileNav);
    };
  }, []);

  return {
    user,
    ref,
  };
};
