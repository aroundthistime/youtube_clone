/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {NavTabType} from '../../../@types/NavTabType';
import routes from '../../../routes';

export interface FeedTabType extends NavTabType {
  path: string;
}

type ReturnType = {
  feedTabs: FeedTabType[];
};

export const useFeedTabs = (): ReturnType => {
  const location = useLocation();
  const getFeedTabIsSelected = (path: string): boolean => {
    return location.pathname === routes.feed + path;
  };
  const feedTabContents = useMemo(() => {
    return [
      {
        name: 'Liked Videos',
        iconClassName: 'fa-solid fa-thumbs-up',
        path: routes.likedVideos,
      },
      {
        name: 'History',
        iconClassName: 'fa-solid fa-clock-rotate-left',
        path: routes.history,
      },
      {
        name: 'Watch Later',
        iconClassName: 'fa-regular fa-clock',
        path: routes.watchLater,
      },
    ];
  }, []);
  const feedTabs: FeedTabType[] = useMemo(() => {
    return feedTabContents.map(feedTabContent => {
      return {
        ...feedTabContent,
        path: routes.feed + feedTabContent.path,
        isSelected: getFeedTabIsSelected(feedTabContent.path),
      };
    });
  }, [location.pathname]);

  return {
    feedTabs,
  };
};
