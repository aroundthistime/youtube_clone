import React from 'react';
import {VideoType} from '../../../../@types/VideoType';
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

type VideoInfoProps = {
  video: VideoType;
};

VideoDetailPage.VideoInfo = ({video}: VideoInfoProps) => {
  return (
    <div className="video-infos">
      <h3 className="video-title">{video.title}</h3>
      <div className="video-infos__primary-infos">
        {/* <div>
          <span className='video-infos__primary'
        </div> */}
      </div>
    </div>
  );
};

export default React.memo(VideoDetailPage);
