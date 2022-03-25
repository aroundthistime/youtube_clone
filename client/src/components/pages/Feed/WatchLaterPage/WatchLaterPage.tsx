import React from 'react';
import {useWatchLaterPage} from './useWatchLaterPage';
import './WatchLaterPage.scss';

const Videos = React.lazy(() => import('../../../partial/Videos/Videos'));

const WatchLaterPage = () => {
  const {videosQuery} = useWatchLaterPage();
  return (
    <main className="watch-later">
      <Videos videosQuery={videosQuery} />
    </main>
  );
};

export default WatchLaterPage;
