import React, {PropsWithChildren, Suspense} from 'react';
import {VideosQueryType} from '../../../@queries/useVideosQuery';
import EmptyContent from '../../atom/EmptyContent/EmptyContent';
import Loader from '../../atom/Loader/Loader';
import FetchMoreIndicator from '../FetchMoreIndicator/FetchMoreIndicator';
import Video from '../Video/Video';
import {useVideos} from './useVideos';
import './Videos.scss';

type Props = {
  videosQuery: VideosQueryType;
  className?: string;
};

const Videos = ({videosQuery, className = ''}: Props) => {
  const {videos, isFetchingNextPage} = useVideos(videosQuery);
  if (videos.length > 0) {
    return (
      <ul className={`videos ${className}`}>
        {videos.map(video => (
          <Video className="videos__video" video={video} key={video._id} />
        ))}
      </ul>
    );
  }
  return <EmptyContent message="동영상이 존재하지 않습니다" />;
};

// <Suspense fallback={<Loader />}>
// {videos.length > 0 ? (
//   <ul className={`videos ${className}`}>
//     {videos.map(video => (
//       <Video className="videos__video" video={video} key={video._id} />
//     ))}
//   </ul>
// ) : (
//   <EmptyContent message="동영상이 존재하지 않습니다" />
// )}
//   {isFetchingNextPage && <FetchMoreIndicator />}
// </Suspense>

export default Videos;
