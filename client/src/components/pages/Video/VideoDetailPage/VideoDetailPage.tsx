import React, {PropsWithChildren, useMemo} from 'react';
import {UseMutationResult} from 'react-query';
import {Link} from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import {useSelector} from 'react-redux';
import {useToggleShowFull} from '../../../../@hooks/useToggleShowFull';
import {getDateTimestamp} from '../../../../utils/dateHandler';
import {getCommaAddedNumber} from '../../../../utils/mathHandler';
import UserAvatarLink from '../../../atom/Links/UserAvatarLink/UserAvatarLink';
import UserNameLink from '../../../atom/Links/UserNameLink/UserNameLink';
import Comments from '../../../partial/Comments/Comments';
import CommentsSortMethodSelector from '../../../partial/CommentsSortMethodSelector/CommentsSortMethodSelector';
import VideoPlayer from '../../../partial/VideoPlayer/VideoPlayer';
import {useVideoDetailPage} from './useVideoDetailPage';
import './VideoDetailPage.scss';
import {RootState} from '../../../../@modules/root';
import {
  useDeleteVideoButton,
  useEditvideoButton,
  useToggleLikeButton,
  useToggleWatchLaterButton,
} from '../../../../@hooks/useVideoButton';
import AddCommentForm from '../../../partial/CommentForm/AddCommentForm/AddCommentForm';

const VideoDetailPage = () => {
  const {video} = useVideoDetailPage();
  return (
    <main className="video-detail">
      <VideoPlayer video={video}>
        <VideoPlayer.Controller />
      </VideoPlayer>
      <VideoDetailPage.VideoInfo />
      <VideoDetailPage.VideoMeta />
      <VideoDetailPage.Comments />
    </main>
  );
};

VideoDetailPage.Section = ({
  children,
  className = '',
}: PropsWithChildren<{className?: string}>) => (
  <section className={`video-detail__section ${className}`}>{children}</section>
);

VideoDetailPage.VideoInfo = React.memo(() => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) {
    return null;
  }
  return (
    <VideoDetailPage.Section className="video-detail__infos">
      <h3 className="video__title">{video.title}</h3>
      <div className="video-detail__primary-infos">
        <div className="video-statistics">
          <span className="video-statistics__statistic video__views">
            조회수 {getCommaAddedNumber(video.views)}회
          </span>
          <span className="video-statistics__statistic video__date">
            {getDateTimestamp(new Date(video.uploadTime))}
          </span>
        </div>
        <VideoDetailPage.InteractionButtons />
      </div>
    </VideoDetailPage.Section>
  );
});

VideoDetailPage.InteractionButtons = React.memo(() => (
  <div className="video-detail__interaction-buttons">
    <VideoDetailPage.ToggleLikeButton />
    <VideoDetailPage.ToggleWatchLaterButton />
  </div>
));

VideoDetailPage.ToggleLikeButton = React.memo(() => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const {onClick, isActive} = useToggleLikeButton(
    video._id,
    Boolean(video.isLiked),
  );
  return (
    <VideoDetailPage.InteractionButton
      onClick={onClick}
      text="좋아요"
      activeIconClassName="fa-solid fa-thumbs-up"
      inactiveIconClassName="fa-regular fa-thumbs-up"
      isActive={isActive}
    />
  );
});

VideoDetailPage.ToggleWatchLaterButton = React.memo(() => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const {onClick, isActive} = useToggleWatchLaterButton(
    video._id,
    Boolean(video.isInWatchLater),
  );
  return (
    <VideoDetailPage.InteractionButton
      onClick={onClick}
      text="나중에 볼 영상에 추가"
      activeIconClassName="fa-solid fa-square-plus"
      inactiveIconClassName="fa-regular fa-square-plus"
      isActive={isActive}
    />
  );
});

type VideoInteractionButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  activeIconClassName: string;
  inactiveIconClassName: string;
  isActive: boolean;
};

VideoDetailPage.InteractionButton = ({
  onClick,
  isActive,
  text,
  activeIconClassName,
  inactiveIconClassName,
}: VideoInteractionButtonProps) => (
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

VideoDetailPage.VideoMeta = React.memo(() => {
  const user = useSelector((state: RootState) => state.user);
  const video = useSelector((state: RootState) => state.playingVideo);
  const isMyVideo = useMemo(
    () => video?.creator._id === user?._id,
    [video, user],
  );
  if (!video) {
    return null;
  }
  return (
    <VideoDetailPage.Section className="video-detail__meta">
      <UserAvatarLink user={video.creator} isLazyImage={false} />
      <div className="video-detail__meta-contents">
        <UserNameLink
          user={video.creator}
          className="video-detail__meta-content"
        />
        {isMyVideo && <VideoDetailPage.MyVideoConfigButtons />}
        <VideoDetailPage.Description />
      </div>
    </VideoDetailPage.Section>
  );
});

VideoDetailPage.MyVideoConfigButtons = () => (
  <div className="video-detail__video-config-buttons">
    <VideoDetailPage.EditVideoButton />
    <VideoDetailPage.DeleteVideoButton />
  </div>
);

VideoDetailPage.EditVideoButton = () => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const {onClick} = useEditvideoButton(video._id);
  return (
    <VideoDetailPage.MyVideoConfigButton onClick={onClick} text="영상 수정" />
  );
};

VideoDetailPage.DeleteVideoButton = () => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const {onClick} = useDeleteVideoButton(video._id);
  return (
    <VideoDetailPage.MyVideoConfigButton onClick={onClick} text="영상 삭제" />
  );
};

type MyVideoConfigButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

VideoDetailPage.MyVideoConfigButton = ({
  onClick,
  text,
}: MyVideoConfigButtonProps) => (
  <button
    onClick={onClick}
    className="video-config-buttons__config-button"
    type="button">
    {text}
  </button>
);

VideoDetailPage.Description = React.memo(() => {
  const description = useSelector(
    (state: RootState) => state.playingVideo?.description,
  );
  const {
    ref: descriptionRef,
    isOverflowing,
    showFull,
    toggleShowFull,
  } = useToggleShowFull();
  return (
    <div className="video-detail__meta-content video-detail__description">
      <div
        ref={descriptionRef}
        className={`description__content ${
          showFull ? 'description__content--full' : ''
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
    </div>
  );
});

VideoDetailPage.Comments = React.memo(() => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) {
    return null;
  }
  return (
    <VideoDetailPage.Section className="video-detail__comments">
      <div className="comments__header">
        <p className="comments-count">
          댓글 {getCommaAddedNumber(video.commentsCount)}개
        </p>
        <CommentsSortMethodSelector />
      </div>
      <AddCommentForm />
      <Comments />
    </VideoDetailPage.Section>
  );
});

export default React.memo(VideoDetailPage);
