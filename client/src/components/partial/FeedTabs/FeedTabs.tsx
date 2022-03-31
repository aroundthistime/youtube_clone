import React, {useMemo} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {NavTabContentType} from '../../../@types/NavTabType';
import routes from '../../../routes';
import {NavTabContent} from '../Nav/Nav';

const FeedTabs = () => {
  return (
    <ul className="nav__tabs feed-tabs">
      <FeedTabs.LikedVideosTab />
      <FeedTabs.HistoryTab />
      <FeedTabs.WatchLaterTab />
    </ul>
  );
};

FeedTabs.LikedVideosTab = () => (
  <FeedTabs.FeedTab
    name="Liked Videos"
    iconClassName="fa-solid fa-thumbs-up"
    path={routes.feed + routes.likedVideos}
  />
);

FeedTabs.HistoryTab = () => (
  <FeedTabs.FeedTab
    name="History"
    iconClassName="fa-solid fa-clock-rotate-left"
    path={routes.feed + routes.history}
  />
);

FeedTabs.WatchLaterTab = () => (
  <FeedTabs.FeedTab
    name="Watch Later"
    iconClassName="fa-regular fa-clock"
    path={routes.feed + routes.watchLater}
  />
);

type FeedTabProps = Pick<NavTabContentType, 'name' | 'iconClassName'> & {
  path: string;
};

FeedTabs.FeedTab = ({name, iconClassName, path}: FeedTabProps) => {
  const location = useLocation();
  const isSelected = useMemo(() => {
    return location.pathname === routes.feed + path;
  }, [location.pathname]);
  return (
    <Link to={path} className="feed-link">
      <NavTabContent
        tab={{
          name,
          iconClassName,
          isSelected,
        }}
      />
    </Link>
  );
};

export default FeedTabs;
