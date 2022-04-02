import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {UseMutationResult} from 'react-query';
import {Link} from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import {toast} from 'react-toastify';
import {useIsOverflowing} from '../../../../@hooks/useIsOverflowing';
import {useToggleShowFull} from '../../../../@hooks/useToggleShowFull';
import {
  useToggleLikeVideoMutation,
  useToggleWatchLaterMutation,
} from '../../../../@queries/useVideoMutation';
import {VideoType} from '../../../../@types/VideoType';
import constants from '../../../../constants';
import {getDateTimestamp} from '../../../../utils/dateHandler';
import UserAvatarLink from '../../../atom/Links/UserAvatarLink/UserAvatarLink';
import UserNameLink from '../../../atom/Links/UserNameLink/UserNameLink';
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
      <VideoDetailPage.VideoMeta video={video} />
    </main>
  );
};

VideoDetailPage.Section = ({
  children,
  className = '',
}: PropsWithChildren<{className?: string}>) => (
  <section className={`video-detail__section ${className}`}>{children}</section>
);

type VideoInfoProps = {
  video: VideoType;
};

VideoDetailPage.VideoInfo = ({video}: VideoInfoProps) => {
  return (
    <VideoDetailPage.Section className="video-detail__infos">
      <h3 className="video__title">{video.title}</h3>
      <div className="video-detail__primary-infos">
        <div className="video-statistics">
          <span className="video-statistics__statistic video__views">
            조회수 {video.views.toLocaleString('en')}회
          </span>
          <span className="video-statistics__statistic video__date">
            {getDateTimestamp(new Date(video.uploadTime))}
          </span>
        </div>
        <div className="video-detail__interaction-buttons">
          <VideoDetailPage.ToggleLikeButton
            videoId={video._id}
            isActivate={Boolean(video.isLiked)}
          />
          <VideoDetailPage.ToggleWatchLaterButton
            videoId={video._id}
            isActivate={video.isInWatchLater}
          />
          <VideoDetailPage.ShareButtons />
        </div>
      </div>
    </VideoDetailPage.Section>
  );
};

type VideoToggleButtonProps = {
  videoId: string;
  isActivate?: boolean;
};

VideoDetailPage.ToggleLikeButton = React.memo(
  ({videoId, isActivate}: VideoToggleButtonProps) => (
    <VideoDetailPage.InteractionButton
      videoId={videoId}
      mutation={useToggleLikeVideoMutation}
      text="좋아요"
      activeIconClassName="fa-solid fa-thumbs-up"
      inactiveIconClassName="fa-regular fa-thumbs-up"
      isActive={isActivate}
    />
  ),
);

VideoDetailPage.ToggleWatchLaterButton = React.memo(
  ({videoId, isActivate}: VideoToggleButtonProps) => (
    <VideoDetailPage.InteractionButton
      videoId={videoId}
      mutation={useToggleWatchLaterMutation}
      text="나중에 볼 영상에 추가"
      activeIconClassName="fa-solid fa-square-plus"
      inactiveIconClassName="fa-regular fa-square-plus"
      isActive={isActivate}
    />
  ),
);

type VideoInteractionButtonProps = {
  videoId: string;
  mutation: () => UseMutationResult<any, unknown, string, unknown>;
  text: string;
  activeIconClassName: string;
  inactiveIconClassName: string;
  isActive?: boolean;
};

VideoDetailPage.InteractionButton = ({
  videoId,
  mutation,
  isActive: isActiveState,
  text,
  activeIconClassName,
  inactiveIconClassName,
}: VideoInteractionButtonProps) => {
  const [isActive, setisActive] = useState<boolean>(Boolean(isActiveState));
  const {mutateAsync, isLoading} = mutation();
  const onClick = useCallback(async () => {
    try {
      if (isLoading) return;
      await mutateAsync(videoId);
      setisActive(prev => !prev);
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  }, [mutateAsync]);
  return (
    <button
      className="video-detail__interaction-button"
      type="button"
      onClick={onClick}>
      <i
        className={`interaction-button__icon ${
          isActive ? activeIconClassName : inactiveIconClassName
        }`}
      />
      <p className="interaction-button__text">{text}</p>
    </button>
  );
};

VideoDetailPage.ShareButtons = React.memo(() => {
  const url = window.location.pathname;
  const className =
    'video-detail__interaction-button video-detail__share-button';
  const size = 24;
  return (
    <>
      <VideoDetailPage.FacebookShareButton
        url={url}
        className={className}
        size={size}
      />
      <VideoDetailPage.TwitterShareButton
        url={url}
        className={className}
        size={size}
      />
    </>
  );
});

type VideoShareButtonProps = {
  url: string;
  className: string;
  size: number;
};

VideoDetailPage.FacebookShareButton = ({
  url,
  className,
  size,
}: VideoShareButtonProps) => (
  <FacebookShareButton className={className} url={url}>
    <FacebookIcon size={size} round />
  </FacebookShareButton>
);

VideoDetailPage.TwitterShareButton = ({
  url,
  className,
  size,
}: VideoShareButtonProps) => (
  <TwitterShareButton className={className} url={url}>
    <TwitterIcon size={size} round />
  </TwitterShareButton>
);

type VideoMetaProps = {
  video: VideoType;
};

VideoDetailPage.VideoMeta = ({video}: VideoMetaProps) => {
  return (
    <VideoDetailPage.Section className="video-detail__meta">
      <UserAvatarLink user={video.creator} isLazyImage={false} />
      <div className="video-detail__meta-contents">
        <UserNameLink
          user={video.creator}
          className="video-detail__meta-content"
        />
        <VideoDetailPage.Description description={video.description} />
      </div>
    </VideoDetailPage.Section>
  );
};

type VideoDescriptionProps = {
  description?: string;
};

VideoDetailPage.Description = React.memo(
  ({description = ''}: VideoDescriptionProps) => {
    // const descriptionRef = useRef<HTMLParagraphElement>(null);
    const {
      ref: descriptionRef,
      isOverflowing,
      showFull,
      toggleShowFull,
    } = useToggleShowFull();
    // const [showFullDescription, setShowFullDescription] = useState(false);

    // useEffect(() => {
    //   if (descriptionRef.current) {
    //     console.log(getNumberOfLines(descriptionRef.current));
    //   }
    // }, [descriptionRef.current]);
    // console.log(descriptionNumOfLines, descriptionRef.current);
    // const [descriptionRef, isOverflowing] = useIsOverflowing();

    // const onToggleButtonClick = () => {
    //   setShowFullDescription(prev => !prev);
    // };

    return (
      <>
        {/* <div
          ref={descriptionRef}
          className={`video-detail__meta-content video-detail__description ${
            showFullDescription ? 'video-detail__description--full' : ''
          }`}>
          {description}
        </div>
        {isOverflowing && (
          <button
            className="video-description__toggle-button"
            onClick={onToggleButtonClick}
            type="button">
            {showFullDescription ? '간략히' : '자세히'}
          </button>
        )} */}
        <div
          ref={descriptionRef}
          className={`video-detail__meta-content video-detail__description ${
            showFull ? 'video-detail__description--full' : ''
          }`}>
          {description}
        </div>
        {isOverflowing && (
          <button
            className="video-description__toggle-button"
            onClick={toggleShowFull}
            type="button">
            {showFull ? '간략히' : '자세히'}
          </button>
        )}
      </>
    );
  },
);

export default React.memo(VideoDetailPage);
