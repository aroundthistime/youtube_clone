import React from 'react';
import VideoPlayer from '../../../partial/VideoPlayer/VideoPlayer';
import {useVideoDetailPage} from './useVideoDetailPage';
import './VideoDetailPage.scss';

const VideoDetailPage = () => {
  const {video} = useVideoDetailPage();
  return (
    <main className="video-detail">
      <VideoPlayer video={video}>
        <VideoPlayer.Controller />
      </VideoPlayer>
    </main>
  );
};

export default React.memo(VideoDetailPage);
