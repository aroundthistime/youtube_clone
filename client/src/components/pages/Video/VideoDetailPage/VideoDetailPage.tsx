import React from 'react';
import {VideoType} from '../../../../@types/VideoType';
import {getDateTimestamp} from '../../../../utils/dateHandler';
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
      <VideoDetailPage.VideoInfo video={video} />
    </main>
  );
};

type VideoInfoProps = {
  video: VideoType;
};

VideoDetailPage.VideoInfo = ({video}: VideoInfoProps) => {
  return (
    <div className="video-detail__infos">
      <h3 className="video__title">{video.title}</h3>
      <div className="video-detail__primary-infos">
        <div className="video-statistics">
          <span className="video-statistics__statistic video__views">
            {video.views.toLocaleString('en')}회
          </span>
          <span className="video-statistics__statistic video__date">
            {getDateTimestamp(new Date(video.uploadTime))}
          </span>
        </div>
        <div className="video__interaction-buttons">1</div>
      </div>
    </div>
  );
};

// type Props = {
//   mutation;
//   activeIconClassName : string;
//   inactiveIconClassName : string;
// }

// VideoDetailPage.InteractionButton = () => {
//   <div className=''
// }

export default React.memo(VideoDetailPage);
