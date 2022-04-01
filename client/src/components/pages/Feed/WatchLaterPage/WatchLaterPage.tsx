import React from 'react';
import {useWatchLaterPage} from './useWatchLaterPage';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import './WatchLaterPage.scss';
import {
  useClearWatchLaterMutation,
  useToggleWatchLaterMutation,
} from '../../../../@queries/useVideoMutation';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';
import Videos from '../../../partial/Videos/Videos';
import FeedClearButton from '../../../partial/FeedClearButton/FeedClearButton';

const WatchLaterPage = () => {
  const {videosQuery} = useWatchLaterPage();
  return (
    <main className="watch-later">
      <WatchLaterPage.Header />
      <Videos videosQuery={videosQuery} VideoComponent={WatchLaterPage.Video} />
    </main>
  );
};

WatchLaterPage.Header = React.memo(() => (
  <Videos.Header>
    <Videos.Title>나중에 볼 영상</Videos.Title>
    <Videos.HeaderRight>
      <FeedClearButton clearMutation={useClearWatchLaterMutation} />
    </Videos.HeaderRight>
  </Videos.Header>
));

WatchLaterPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useToggleWatchLaterMutation} {...props} />
);

export default WatchLaterPage;
