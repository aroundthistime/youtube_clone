/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import {LegacyRef, useEffect, useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {RootState} from '../../../@modules/root';
import {UserState} from '../../../@modules/userSlice';
import routes from '../../../routes';
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
  const location = useLocation();
  const urlQuery = useUrlQuery();
  const ref = useRef<HTMLElement>(null);

  const requestHideMobileNav = (event: MouseEvent) => {
    hideMobileNav(ref.current);
  };

  const isNavShowingPage = useMemo(() => {
    const isHomePage = location.pathname === routes.home;
    const isCategoryPage =
      location.pathname === routes.videos && Boolean(urlQuery.get('category'));
    const isFeedPage = [
      routes.history,
      routes.likedVideos,
      routes.watchLater,
    ].find(pathname => location.pathname === routes.feed + pathname);
    const isSearchPage = location.pathname === routes.search;
    return isHomePage || isCategoryPage || isFeedPage || isSearchPage;
  }, [location.pathname, urlQuery.get('category')]);

  useEffect(() => {
    window.addEventListener('click', requestHideMobileNav);
    return () => {
      window.removeEventListener('click', requestHideMobileNav);
    };
  }, []);

  useEffect(() => {
    if (isNavShowingPage) {
      ref.current?.classList.remove('nav--desktop-hidden');
    } else {
      ref.current?.classList.add('nav--desktop-hidden');
    }
  }, [isNavShowingPage]);

  return {
    user,
    ref,
  };
};
