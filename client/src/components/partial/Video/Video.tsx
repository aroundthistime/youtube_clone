import React, {PropsWithChildren, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {UserType} from '../../../@types/UserType';
import {BriefVideoType} from '../../../@types/VideoType';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import routes from '../../../routes';
import {getTimeDiffFromNowString} from '../../../utils/dateHandler';
import {getBiggestUnitFromNumber} from '../../../utils/mathHandler';
import './Video.scss';
import LazyImage from '../LazyImage/LazyImage';

type Props = {
  video: BriefVideoType;
  className?: string;
};

const Video = ({video, className = ''}: PropsWithChildren<Props>) => {
  const timeDiffFromUploadDate = useMemo(() => {
    return getTimeDiffFromNowString(new Date(video.uploadTime));
  }, [video.uploadTime]);
  const briefViews = useMemo(() => {
    return getBiggestUnitFromNumber(video.views);
  }, [video.views]);
  return (
    <Link to={routes.videoDetail(video._id)} className={`video ${className}`}>
      <Video.Thumbnail
        thumbnailUrl={video.thumbnailUrl}
        videoTitle={video.title}
      />
      <Video.Detail>
        <Video.CreatorProfileLink creator={video.creator} />
        <Video.Infos>
          <Video.InfoText className="video__title">
            {video.title}
          </Video.InfoText>
          <Video.CreatorNameLink creator={video.creator} />
          <Video.InfoText>
            <span>조회수 {briefViews}회</span>
            <span>{timeDiffFromUploadDate}</span>
          </Video.InfoText>
        </Video.Infos>
      </Video.Detail>
    </Link>
  );
};

Video.Thumbnail = ({thumbnailUrl, videoTitle}: VideoThumbnailProps) => (
  <LazyImage className="video__thumbnail" src={thumbnailUrl} alt={videoTitle} />
);

Video.Detail = ({children}: PropsWithChildren<{}>) => (
  <div className="video__detail">{children}</div>
);

Video.CreatorProfileLink = ({creator}: VideoCreatorAvatarProps) => (
  <Link
    to={routes.userDetail(creator._id)}
    className="video__creator-profile-link">
    <ProfileImage
      src={creator.avatarUrl}
      className="creator-link__profile-image"
    />
  </Link>
);

Video.Infos = ({children}: PropsWithChildren<{}>) => (
  <div className="video__infos">{children}</div>
);

Video.InfoText = ({
  children,
  className = '',
}: PropsWithChildren<{className?: string}>) => (
  <p className={`video__info-text ${className}`}>{children}</p>
);

Video.CreatorNameLink = ({
  creator,
}: PropsWithChildren<VideoCreatorNameProps>) => (
  <Link to={routes.userDetail(creator._id)}>
    <Video.InfoText className="creator-link__name-text">
      {creator.name}
    </Video.InfoText>
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
