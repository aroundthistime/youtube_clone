/* eslint-disable import/prefer-default-export */

import React, {useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {RootState} from '../../../@modules/root';
import {UserState} from '../../../@modules/userSlice';
import routes from '../../../routes';

type ReturnType = {
  user: UserState;
  innerRef: React.RefObject<HTMLElement>;
};

// const VISIBLE_MOBILE_NAV_CLASSNAME = 'nav--mobile-visible';
// const HIDDEN_MOBILE_NAV_CLASSNAME = 'nav--mobile-hidden';

export const useNav = (
  forwardRef: React.ForwardedRef<HTMLElement>,
): ReturnType => {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const urlQuery = useUrlQuery();
  const innerRef = useRef<HTMLElement>(null);
  useImperativeHandle(forwardRef, () => innerRef.current as HTMLElement);

  const isNavShowingPage = useMemo(() => {
    const isHomePage = location.pathname === routes.home;
    const isCategoryPage = location.pathname.split('/')[1] === 'category';
    const isFeedPage = [
      routes.history,
      routes.likedVideos,
      routes.watchLater,
    ].find(pathname => location.pathname === routes.feed + pathname);
    const isSearchPage = location.pathname === routes.search;
    return isHomePage || isCategoryPage || isFeedPage || isSearchPage;
  }, [location.pathname, urlQuery.get('category')]);

  useEffect(() => {
    if (isNavShowingPage) {
      innerRef.current?.classList.remove('nav--desktop-hidden');
    } else {
      innerRef.current?.classList.add('nav--desktop-hidden');
    }
  }, [isNavShowingPage]);

  return {
    user,
    innerRef,
  };
};
