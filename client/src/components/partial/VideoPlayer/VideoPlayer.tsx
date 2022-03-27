/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {VideoType} from '../../../@types/VideoType';
import './VideoPlayer.scss';

type Props = {
  video: VideoType;
  className?: string;
};

interface IVideoPlayer
  extends React.ForwardRefExoticComponent<
    Props & React.RefAttributes<HTMLVideoElement>
  > {
  Controller: React.FC<VideoPlayerControllerProps>;
  ControllerButton: React.FC<VideoControllerButtonProps>;
}

const VideoPlayer = React.forwardRef<
  HTMLVideoElement,
  PropsWithChildren<Props>
>(({video, className = '', children}, ref) => (
  <div className={`video-player ${className}`}>
    <video
      className="video-player__video"
      src={process.env.REACT_APP_BASE_URL + video.fileUrl}
      ref={ref}
    />
    {children}
  </div>
)) as IVideoPlayer;
// const VideoPlayer = ({video}: Props) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   return (
//     <div className="video-player">

//     </div>
//   );
// };

type VideoPlayerControllerProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

VideoPlayer.Controller = ({videoRef}: VideoPlayerControllerProps) => {
  const videoElement = useMemo(
    () => videoRef.current,
    [videoRef.current],
  ) as HTMLVideoElement;
  const playVideo = useCallback(() => videoElement.play(), [videoElement]);
  const stopVideo = useCallback(() => videoElement.pause(), [videoElement]);
  const toggleVideoMute = useCallback(() => {
    if (videoElement.volume === 1) {
      videoElement.volume = 0;
    } else {
      videoElement.volume = 1;
    }
  }, [videoElement]);
  const volumeIconClassName = useMemo(() => {
    if (videoElement.volume === 0) {
      return 'fa-solid fa-volume-xmark';
    }
    if (videoElement.volume <= 0.5) {
      return 'fa-solid fa-volume-low';
    }
    return 'fa-solid fa-volume-high';
  }, [videoElement.volume]);
  return (
    <div className="video-player__controller">
      <div className="controller__column">
        {videoElement?.paused ? (
          <VideoPlayer.ControllerButton
            onClick={playVideo}
            iconClassName="fa-solid fa-play"
          />
        ) : (
          <VideoPlayer.ControllerButton
            onClick={stopVideo}
            iconClassName="fa-solid fa-pause"
          />
        )}
        <label className="video-player__volume-controller">
          <VideoPlayer.ControllerButton
            onClick={toggleVideoMute}
            iconClassName={volumeIconClassName}
            className="volume-controller__icon"
          />
        </label>
      </div>
      <div className="controller__column" />
    </div>
  );
};

// VideoPlayer.PlayButton =

type VideoControllerButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconClassName: string;
  className?: string;
};

VideoPlayer.ControllerButton = ({
  onClick,
  iconClassName,
  className = '',
}: VideoControllerButtonProps) => (
  <button
    type="button"
    className={`controller__button ${className}`}
    onClick={onClick}>
    <i className={`button__icon ${iconClassName}`} />
  </button>
);

export default React.memo(VideoPlayer);
