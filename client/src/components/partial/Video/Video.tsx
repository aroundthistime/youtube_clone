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
import {BriefVideoType} from '../../../@types/VideoType';
import routes from '../../../routes';
import './Video.scss';
import LazyImage from '../LazyImage/LazyImage';
import {useVideo} from './useVideo';
import {useToggleWatchLaterMutation} from '../../../@queries/useVideoMutation';
import constants from '../../../constants';
import UserAvatarLink from '../../atom/Links/UserAvatarLink/UserAvatarLink';
import UserNameLink from '../../atom/Links/UserNameLink/UserNameLink';
import {
  useDeleteVideoButton,
  useEditvideoButton,
  useToggleWatchLaterButton,
} from '../../../@hooks/useVideoButton';

interface IVideo
  extends React.MemoExoticComponent<
    ({video, className, render}: PropsWithChildren<Props>) => JSX.Element | null
  > {
  Thumbnail: React.FC<VideoThumbnailProps>;
  Detail: React.FC<{}>;
  Infos: React.FC<{}>;
  InfoText: React.FC<VideoInfoTextProps>;
  OverlayButtons: React.FC<{}>;
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
          <UserAvatarLink
            user={video.creator}
            className="video__creator-profile-link"
          />
          <Video.Infos>
            <Link to={routes.videoDetail(video._id)}>
              <Video.InfoText className="video__title">
                {video.title}
              </Video.InfoText>
            </Link>
            <UserNameLink user={video.creator} className="video__info-text" />
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

Video.Infos = ({children}: PropsWithChildren<{}>) => (
  <div className="video__infos">{children}</div>
);

Video.InfoText = ({
  children,
  className = '',
}: PropsWithChildren<VideoInfoTextProps>) => (
  <p className={`video__info-text ${className}`}>{children}</p>
);

Video.OverlayButtons = ({children}: PropsWithChildren<{}>) => (
  <div className="video__overlay-buttons">{children}</div>
);

Video.EditVideoButton = ({videoId}: VideoEditButtonProps) => {
  const {onClick} = useEditvideoButton(videoId);
  return (
    <Video.OverlayButton
      text="영상 수정"
      onClick={onClick}
      iconClassName="fa-solid fa-pencil"
    />
  );
};

Video.DeleteVideoButton = ({videoId, setRender}: VideoDeleteButtonProps) => {
  const onDeleteSuccessCallback = useCallback(() => setRender(false), []);
  const {onClick} = useDeleteVideoButton(videoId, onDeleteSuccessCallback);

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
    const {
      onClick,
      isLoading,
      isActive: isInWatchLater,
    } = useToggleWatchLaterButton(videoId, isInWatchLaterProp);

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

type VideoInfoTextProps = {
  className?: string;
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
