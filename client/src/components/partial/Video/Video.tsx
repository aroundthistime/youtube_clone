/* eslint-disable no-alert */
import React, {PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {UserType} from '../../../@types/UserType';
import {BriefVideoType} from '../../../@types/VideoType';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import routes from '../../../routes';
import './Video.scss';
import LazyImage from '../LazyImage/LazyImage';
import {useVideo} from './useVideo';
import {
  useAddNoInterestMutation,
  useDeleteVideoMutation,
} from '../../../@queries/useVideoMutation';

type Props = {
  video: BriefVideoType;
  className?: string;
};

const Video = ({video, className = ''}: PropsWithChildren<Props>) => {
  const {isMyVideo, timeDiffFromUploadDate, briefViews, isLoggedIn} =
    useVideo(video);
  return (
    // <Link to={routes.videoDetail(video._id)} className={`video ${className}`}>
    <div className={`video ${className}`}>
      <Video.Thumbnail
        thumbnailUrl={process.env.REACT_APP_BASE_URL + video.thumbnailUrl}
        videoTitle={video.title}
      />
      {isLoggedIn && (
        <Video.OverlayButtons videoId={video._id} isMyVideo={isMyVideo} />
      )}
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
    </div>
    // </Link>
  );
};

Video.Thumbnail = ({thumbnailUrl, videoTitle}: VideoThumbnailProps) => (
  <div className="video__thumbnail">
    <LazyImage src={thumbnailUrl} alt={videoTitle} />
  </div>
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

Video.OverlayButtons = ({videoId, isMyVideo}: VideoOverlayButtonsProps) => {
  return (
    <div className="video__overlay-buttons">
      {isMyVideo ? (
        <>
          <Video.EditVideoButton videoId={videoId} />
          <Video.DeleteVideoButton videoId={videoId} />
        </>
      ) : (
        <Video.NoInterestButton videoId={videoId} />
      )}
    </div>
  );
};

Video.EditVideoButton = ({videoId}: VideoIdProps) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(routes.editVideo(videoId));
  }, [videoId]);
  return (
    <Video.OverlayButton
      text="Edit Video"
      onClick={onClick}
      iconClassName="fa-solid fa-pencil"
    />
  );
};

Video.DeleteVideoButton = ({videoId}: VideoIdProps) => {
  const {mutateAsync, data} = useDeleteVideoMutation();
  const onClick = useCallback(() => {
    if (window.confirm('정말 해당 영상을 삭제하시겠습니까?')) {
      mutateAsync(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (data?.result === true) {
      toast.success('해당 영상을 삭제했습니다.');
      window.location.reload();
    } else if (data?.result === false) {
      toast.error('요청하신 작업에 실패했습니다.');
    }
  }, [data?.result]);

  return (
    <Video.OverlayButton
      text="Delete Video"
      onClick={onClick}
      iconClassName="fa-solid fa-trash-can"
    />
  );
};

Video.WatchLaterButton = ({isLiked : isLikedProp, videoId} : VideoWatchLaterButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedProp);
  // const {mutateAsync, data} = 

  return (

  )
  }

Video.NoInterestButton = ({videoId}: VideoIdProps) => {
  const {mutateAsync, data} = useAddNoInterestMutation();
  const onClick = useCallback(() => {
    if (window.confirm('해당 영상을 더 이상 보고싶지 않으신가요?')) {
      mutateAsync(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (data?.result === true) {
      toast.success('해당 영상이 더 이상 보여지지 않습니다.');
      window.location.reload();
    } else if (data?.result === false) {
      toast.error('요청하신 작업에 실패했습니다.');
    }
  }, [data?.result]);

  return (
    <Video.OverlayButton
      text="Not Interested"
      onClick={onClick}
      iconClassName="fa-solid fa-x"
    />
  );
};

Video.OverlayButton = React.memo(
  ({text, iconClassName, onClick}: VideoOverlayButtonProps) => (
    <button className="video__overlay-button" type="button" onClick={onClick}>
      <div className="overlay-button__full-text">{text}</div>
      <i className={`overlay-button__icon ${iconClassName}`} />
    </button>
  ),
);

// Video.MyVideoOverlayButtons = ({videoId}: VideoOverlayButtonsProps) => {
//   return (
//     <div className="video__overlay-buttons">
//       <Video.EditButton videoId={videoId} />
//       <Video.DeleteButton videoId={videoId} />
//     </div>
//   );
// };

// Video.EditButton = ({videoId}: VideoIdParams) => {
//   const navigate = useNavigate();
//   const onClick = () =>
//     useCallback(() => {
//       navigate(routes.editVideo(videoId));
//     }, [videoId]);
//   return (
//     <Video.OverlayButton
//       text="Edit Video"
//       onClick={onClick}
//       iconClassName="fa-solid fa-pencil"
//     />
//   );
// };

// Video.DeleteButton = ({videoId}: VideoIdParams) => {
//   const {mutateAsync, data} = useDeleteVideoMutation();
//   const navigate = useNavigate();
//   const onClick = () =>
//     useCallback(() => {
//       if (window.confirm('정말 해당 영상을 삭제하시겠습니까?')) {
//         mutateAsync(videoId);
//       }
//     }, [videoId]);
//   useEffect(() => {
//     if (data === true) {
//       alert('해당 영상이 삭제되었습니다.');
//       navigate(routes.home);
//     } else {
//       alert('요청하신 작업에 실패했습니다.');
//     }
//   }, [data]);
//   return (
//     <Video.OverlayButton
//       text="Delete Video"
//       onClick={onClick}
//       iconClassName="fa-solid fa-trash-can"
//     />
//   );
// };

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

type VideoOverlayButtonsProps = {
  videoId: string;
  isMyVideo: boolean;
};

interface VideoIdProps {
  videoId: string;
};

interface VideoWatchLaterButtonProps extends VideoIdProps {
  isLiked : boolean;
}

type VideoOverlayButtonProps = {
  text: string;
  iconClassName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default React.memo(Video);
