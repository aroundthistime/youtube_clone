/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import {VideoType} from '../../../@types/VideoType';
import './VideoPlayer.scss';

type Props = {
  video: VideoType;
};

const VideoPlayer = ({video}: Props) => {
  return (
    <div className="video-player">
      <video className="video-player__video" src={video.fileUrl} />
    </div>
  );
};

export default React.memo(VideoPlayer);
