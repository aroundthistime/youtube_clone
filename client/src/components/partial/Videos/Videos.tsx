import React, {PropsWithChildren} from 'react';
import {VideosQueryType} from '../../../@queries/useVideosQuery';
import EmptyContent from '../../atom/EmptyContent/EmptyContent';
import DefaultVideo from '../DefaultVideo/DefaultVideo';
import FetchMoreIndicator from '../FetchMoreIndicator/FetchMoreIndicator';
import {useVideos} from './useVideos';
import './Videos.scss';

type Props = {
  videosQuery: VideosQueryType;
  className?: string;
  VideoComponent?: any;
};

const Videos = ({
  videosQuery,
  className = '',
  VideoComponent = DefaultVideo,
}: Props) => {
  const {videos, isFetchingNextPage} = useVideos(videosQuery);
  if (videos.length > 0) {
    return (
      <>
        <ul className={`videos ${className}`}>
          {videos.map(video => (
            <VideoComponent
              className="videos__video"
              video={video}
              key={video._id}
            />
          ))}
        </ul>
        {isFetchingNextPage && <FetchMoreIndicator />}
      </>
    );
  }
  return <EmptyContent message="동영상이 존재하지 않습니다" />;
};

Videos.Header = ({children}: PropsWithChildren<{}>) => (
  <header className="videos__header">{children}</header>
);

Videos.Title = ({children}: PropsWithChildren<{}>) => (
  <div className="videos__title">{children}</div>
);

Videos.HeaderRight = ({children}: PropsWithChildren<{}>) => (
  <div className="header__right">{children}</div>
);

type VideosHeaderRightButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

Videos.HeaderRightButton = ({
  children,
  onClick,
}: PropsWithChildren<VideosHeaderRightButtonProps>) => (
  <button className="header__button" type="button" onClick={onClick}>
    {children}
  </button>
);

export default Videos;
