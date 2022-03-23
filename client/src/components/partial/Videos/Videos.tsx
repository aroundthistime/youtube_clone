import React, {Suspense} from 'react';
import {BriefVideoType} from '../../../@types/VideoType';
import Loader from '../../atom/Loader/Loader';
import Video from '../Video/Video';
import './Videos.scss';

type Props = {
  videos: BriefVideoType[];
  className?: string;
};

const Videos = ({videos, className = ''}: Props) => (
  <ul className={`videos ${className}`}>
    {videos.map(video => (
      <Video className="videos__video" video={video} key={video._id} />
    ))}
  </ul>
);

export default Videos;
