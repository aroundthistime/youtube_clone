import React from 'react';
import './LikedVideosPage.scss';
import {useLikedVideosPage} from './useLikedVideosPage';

const Videos = React.lazy(() => import('../../../partial/Videos/Videos'));

const LikedVideosPage = () => {
  const {videosQuery} = useLikedVideosPage();
  return (
    <main className="liked-videos">
      <Videos videosQuery={videosQuery} />
    </main>
  );
};

export default LikedVideosPage;
