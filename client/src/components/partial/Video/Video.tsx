import React, {PropsWithChildren, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {UserType} from '../../../@types/UserType';
import {BriefVideoType} from '../../../@types/VideoType';
import routes from '../../../routes';
import {getTimeDiffFromNowString} from '../../../utils/dateHandler';
import {getBiggestUnifFromNumber} from '../../../utils/mathHandler';
import './Video.scss';

// interface VideoSubComponents {
//   Thumbnail: React.FC<VideoThumbnailProps>;
//   Detail: React.FC<{}>;
//   CreatorAvatarLink: React.FC<VideoCreatorAvatarProps>;
//   CreatorNameLink: React.FC<VideoCreatorNameProps>;
//   Title: React.FC<{}>;
//   Infos: React.FC<{}>;
//   InfoText: React.FC<{}>;
// }

type Props = {
  video: BriefVideoType;
  className?: string;
};

const Video = ({video, className = ''}: PropsWithChildren<Props>) => {
  const timeDiffFromUploadDate = useMemo(() => {
    return getTimeDiffFromNowString(new Date(video.uploadTime));
  }, [video.uploadTime]);
  const briefViews = useMemo(() => {
    getBiggestUnifFromNumber(video.views);
  }, [video.views]);
  return (
    <Link to={routes.videoDetail(video._id)} className={`video ${className}`}>
      <Video.Thumbnail
        thumbnailUrl={video.thumbnailUrl}
        videoTitle={video.title}
      />
      <Video.Detail>
        <Video.CreatorAvatarLink creator={video.creator} />
        <Video.Infos>
          <Video.InfoText>{video.title}</Video.InfoText>
          <Video.CreatorNameLink creator={video.creator} />
          <Video.InfoText>
            <span className="video__views">조회수 {briefViews}회</span>
            <span className="video__date">{timeDiffFromUploadDate}</span>
          </Video.InfoText>
        </Video.Infos>
      </Video.Detail>
    </Link>
  );
};

Video.Thumbnail = ({thumbnailUrl, videoTitle}: VideoThumbnailProps) => (
  <img className="video__thumbnail" src={thumbnailUrl} alt={videoTitle} />
);

Video.Detail = ({children}: PropsWithChildren<{}>) => (
  <div className="video__info">{children}</div>
);

Video.CreatorAvatarLink = ({creator}: VideoCreatorAvatarProps) => (
  <Link
    to={routes.userDetail(creator.id)}
    className="video__creator-avatar-link">
    <img
      className="avatar-link__avatar"
      src={creator.avatarUrl}
      alt={creator.name}
    />
  </Link>
);

Video.Infos = ({children}: PropsWithChildren<{}>) => (
  <div className="video__infos">{children}</div>
);

Video.Title = ({children}: PropsWithChildren<{}>) => (
  <p className="video__title">{children}</p>
);

Video.InfoText = ({children}: PropsWithChildren<{}>) => (
  <p className="video__info-text">{children}</p>
);

Video.CreatorNameLink = ({
  creator,
}: PropsWithChildren<VideoCreatorNameProps>) => (
  <Link to={routes.userDetail(creator.id)}>
    <Video.InfoText>{creator.name}</Video.InfoText>
  </Link>
);

type VideoThumbnailProps = {
  thumbnailUrl: string;
  videoTitle: string;
};

type VideoCreatorAvatarProps = {
  creator: UserType;
};

type VideoCreatorNameProps = {
  creator: UserType;
};

export default React.memo(Video);
