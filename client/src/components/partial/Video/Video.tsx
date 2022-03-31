/* eslint-disable no-alert */
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {UseMutationResult} from 'react-query';
import {UserType} from '../../../@types/UserType';
import {BriefVideoType} from '../../../@types/VideoType';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import routes from '../../../routes';
import './Video.scss';
import LazyImage from '../LazyImage/LazyImage';
import {useVideo} from './useVideo';
import {
  useDeleteVideoMutation,
  useToggleWatchLaterMutation,
} from '../../../@queries/useVideoMutation';
import constants from '../../../constants';

interface IVideo
  extends React.MemoExoticComponent<
    ({video, className, render}: PropsWithChildren<Props>) => JSX.Element | null
  > {
  Thumbnail: React.FC<VideoThumbnailProps>;
  Detail: React.FC<{}>;
  CreatorProfileLink: React.FC<VideoCreatorAvatarProps>;
  Infos: React.FC<{}>;
  InfoText: React.FC<VideoInfoTextProps>;
  OverlayButtons: React.FC<{}>;
  CreatorNameLink: React.FC<VideoCreatorNameProps>;
  EditVideoButton: React.FC<VideoEditButtonProps>;
  DeleteVideoButton: React.FC<VideoDeleteButtonProps>;
  ToggleWatchLaterButton: React.FC<ToggleWatchLaterButtonProps>;
  DeleteFromListButton: React.FC<DeleteVideoFromListButtonProps>;
  LoadingOverlayButton: React.FC<{}>;
  OverlayButton: React.FC<VideoOverlayButtonProps>;
}

interface Props {
  video: BriefVideoType;
  className?: string;
  render?: boolean;
}

const Video = React.memo(
  ({
    video,
    className = '',
    render = true,
    children,
  }: PropsWithChildren<Props>) => {
    const {timeDiffFromUploadDate, briefViews} = useVideo(video);
    if (!render) {
      return null;
    }
    return (
      <div className={`video ${className}`}>
        <Link to={routes.videoDetail(video._id)}>
          <Video.Thumbnail
            thumbnailUrl={process.env.REACT_APP_BASE_URL + video.thumbnailUrl}
            videoTitle={video.title}
          />
        </Link>
        <Video.Detail>
          <Video.CreatorProfileLink creator={video.creator} />
          <Video.Infos>
            <Link to={routes.videoDetail(video._id)}>
              <Video.InfoText className="video__title">
                {video.title}
              </Video.InfoText>
            </Link>
            <Video.CreatorNameLink creator={video.creator} />
            <Link to={routes.videoDetail(video._id)}>
              <Video.InfoText>
                <span>조회수 {briefViews}회</span>
                <span>{timeDiffFromUploadDate}</span>
              </Video.InfoText>
            </Link>
          </Video.Infos>
        </Video.Detail>
        {children}
      </div>
    );
  },
) as IVideo;

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
}: PropsWithChildren<VideoInfoTextProps>) => (
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

Video.OverlayButtons = ({children}: PropsWithChildren<{}>) => (
  <div className="video__overlay-buttons">{children}</div>
);

Video.EditVideoButton = ({videoId}: VideoEditButtonProps) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(routes.editVideo(videoId));
  }, [videoId]);
  return (
    <Video.OverlayButton
      text="영상 수정"
      onClick={onClick}
      iconClassName="fa-solid fa-pencil"
    />
  );
};

Video.DeleteVideoButton = ({videoId, setRender}: VideoDeleteButtonProps) => {
  const {mutateAsync, data} = useDeleteVideoMutation();
  const onClick = useCallback(() => {
    if (window.confirm('정말 해당 영상을 삭제하시겠습니까?')) {
      mutateAsync(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (data?.result === true) {
      toast.success('해당 영상을 삭제했습니다.');
      setRender(false);
    } else if (data?.result === false) {
      toast.error('요청하신 작업에 실패했습니다.');
    }
  }, [data?.result]);

  return (
    <Video.OverlayButton
      text="영상 삭제"
      onClick={onClick}
      iconClassName="fa-solid fa-trash-can"
    />
  );
};

Video.ToggleWatchLaterButton = React.memo(
  ({
    videoId,
    isInWatchLater: isInWatchLaterProp,
  }: ToggleWatchLaterButtonProps) => {
    const [isInWatchLater, setIsInWatchLater] =
      useState<boolean>(isInWatchLaterProp);
    const {mutateAsync, isLoading} = useToggleWatchLaterMutation();
    const onClick = useCallback(async () => {
      try {
        await mutateAsync(videoId);
        toggleState();
      } catch (error) {
        toast.error(constants.messages.taskFailed);
      }
    }, [videoId]);

    const toggleState = useCallback(() => {
      setIsInWatchLater(prev => {
        const newState = !prev;
        if (newState) {
          showAddedToWatchLaterToast();
        } else {
          showDeletedFromWatchLaterToast();
        }
        return newState;
      });
    }, [setIsInWatchLater]);

    const showAddedToWatchLaterToast = useCallback(() => {
      toast.success('나중에 볼 영상에 추가되었습니다.', {
        toastId: 'addToWatchLaterSuccess',
      });
    }, []);

    const showDeletedFromWatchLaterToast = useCallback(() => {
      toast.success('나중에 볼 영상에서 삭제되었습니다.', {
        toastId: 'deleteFromWatchLaterSuccess',
      });
    }, []);

    if (isLoading) {
      return <Video.LoadingOverlayButton />;
    }

    return (
      <Video.OverlayButton
        text={
          isInWatchLater ? '나중에 볼 영상에서 제거' : '나중에 볼 영상에 추가'
        }
        onClick={onClick}
        iconClassName={
          isInWatchLater
            ? 'fa-solid fa-clock-rotate-left'
            : 'fa-regular fa-clock'
        }
      />
    );
  },
);

Video.DeleteFromListButton = ({
  videoId,
  mutation,
  setRender,
  isRevocable = false,
}: DeleteVideoFromListButtonProps) => {
  const {mutateAsync, isLoading} = mutation();
  const deleteVideoFromList = useCallback(async () => {
    if (!window.confirm(constants.messages.confirmRemoveVideoFromList)) return;
    try {
      await mutateAsync(videoId);
      toast.success(deleteSuccessMessage, {
        onClick: isRevocable ? restoreVideoToList : undefined,
      });
      setRender(false);
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  }, [videoId, setRender]);

  const restoreVideoToList = useCallback(async () => {
    try {
      await mutateAsync(videoId);
      toast.success(constants.messages.taskCanceled);
      setRender(true);
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  }, [videoId, setRender]);

  const deleteSuccessMessage = useMemo(() => {
    return isRevocable
      ? constants.messages.videoRemovedFromList + constants.messages.cancelTask
      : constants.messages.videoRemovedFromList;
  }, [isRevocable]);

  if (isLoading) {
    return <Video.LoadingOverlayButton />;
  }

  return (
    <Video.OverlayButton
      text="목록에서 제거"
      onClick={deleteVideoFromList}
      iconClassName="fa-solid fa-x"
    />
  );
};

Video.LoadingOverlayButton = React.memo(() => (
  <Video.OverlayButton iconClassName="fa-solid fa-spinner" />
));

Video.OverlayButton = React.memo(
  ({text, iconClassName, onClick}: VideoOverlayButtonProps) => (
    <button className="video__overlay-button" type="button" onClick={onClick}>
      {text && <div className="overlay-button__full-text">{text}</div>}
      <div className="overlay-button--default">
        <i className={`overlay-button__icon ${iconClassName}`} />
      </div>
    </button>
  ),
);

type VideoThumbnailProps = {
  thumbnailUrl: string;
  videoTitle: string;
};

type VideoCreatorAvatarProps = {
  creator: UserType;
};

type VideoInfoTextProps = {
  className?: string;
};

type VideoCreatorNameProps = {
  creator: UserType;
};

interface VideoEditButtonProps {
  videoId: string;
}

interface VideoDeleteButtonProps extends VideoEditButtonProps {
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToggleWatchLaterButtonProps {
  videoId: string;
  isInWatchLater: boolean;
}

interface DeleteVideoFromListButtonProps {
  videoId: string;
  mutation: () => UseMutationResult<any, unknown, string, unknown>;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  isRevocable?: boolean;
}

type VideoOverlayButtonProps = {
  text?: string;
  iconClassName: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default Video;
