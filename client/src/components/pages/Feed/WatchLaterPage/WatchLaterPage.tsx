import React from 'react';
import {useWatchLaterPage} from './useWatchLaterPage';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import './WatchLaterPage.scss';
import {useToggleWatchLaterMutation} from '../../../../@queries/useVideoMutation';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';

const Videos = React.lazy(() => import('../../../partial/Videos/Videos'));

const WatchLaterPage = () => {
  const {videosQuery} = useWatchLaterPage();
  return (
    <main className="watch-later">
      <Videos videosQuery={videosQuery} VideoComponent={WatchLaterPage.Video} />
    </main>
  );
};

WatchLaterPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useToggleWatchLaterMutation} {...props} />
);

export default WatchLaterPage;
