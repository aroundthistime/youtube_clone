/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {
  muteVideo,
  pauseVideo,
  playVideo,
  setVolume,
  toggleVideoIsMuted,
} from '../../../@modules/videoPlayerSlice';
import {VideoType} from '../../../@types/VideoType';
import {useVideoPlayer} from './useVideoPlayer';
import './VideoPlayer.scss';

interface IVideoPlayer
  extends React.MemoExoticComponent<
    ({video, className, children}: PropsWithChildren<Props>) => JSX.Element
  > {
  Controller: React.FC<{}>;
  ControllerButton: React.FC<VideoControllerButtonProps>;
  PlayPauseButton: React.FC<{}>;
  PlayButton: React.FC<{}>;
  PauseButton: React.FC<{}>;
  RewindButton: React.FC<{}>;
  VolumeController: React.FC<{}>;
  VolumeButton: React.FC<{}>;
  VolumeRangeInput: React.FC<{}>;
}

type Props = {
  video: VideoType;
  className?: string;
};

const VideoPlayer = React.memo(
  ({video, className = '', children}: PropsWithChildren<Props>) => {
    const {videoRef} = useVideoPlayer(video);
    return (
      <div className={`video-player ${className}`}>
        <video
          className="video-player__video"
          src={process.env.REACT_APP_BASE_URL + video.fileUrl}
          ref={videoRef}
          autoPlay
          muted
          preload="auto"
          playsInline
        />
        {children}
      </div>
    );
  },
) as IVideoPlayer;
// const VideoPlayer = ({video}: Props) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   return (
//     <div className="video-player">

//     </div>
//   );
// };

VideoPlayer.Controller = () => {
  // const videoElement = useMemo(
  //   () => videoRef.current,
  //   [videoRef.current],
  // ) as HTMLVideoElement;
  // const playVideo = useCallback(() => videoElement.play(), [videoElement]);
  // const stopVideo = useCallback(() => videoElement.pause(), [videoElement]);
  // const toggleVideoMute = useCallback(() => {
  //   if (videoElement.volume === 1) {
  //     videoElement.volume = 0;
  //   } else {
  //     videoElement.volume = 1;
  //   }
  // }, [videoElement]);
  return (
    <div className="video-player__controller">
      <div className="controller__column">
        <VideoPlayer.PlayPauseButton />
        <VideoPlayer.VolumeController />
      </div>
      {/* <div className="controller__column">
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
          <input type='range'
        </label>
      </div>
      <div className="controller__column" /> */}
    </div>
  );
};

VideoPlayer.PlayPauseButton = () => {
  const status = useSelector((state: RootState) => state.videoPlayer.status);
  if (status === 'ended') {
    return <VideoPlayer.RewindButton />;
  }
  if (status === 'paused') {
    return <VideoPlayer.PlayButton />;
  }
  return <VideoPlayer.PauseButton />;
};

VideoPlayer.RewindButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(playVideo());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-rotate-right"
    />
  );
};

VideoPlayer.PlayButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(playVideo());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-play"
    />
  );
};

VideoPlayer.PauseButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(pauseVideo());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-pause"
    />
  );
};

VideoPlayer.VolumeController = () => (
  <div className="volume-controller">
    <VideoPlayer.VolumeButton />
    <VideoPlayer.VolumeRangeInput />
  </div>
);

VideoPlayer.VolumeButton = () => {
  const muted = useSelector((state: RootState) => state.videoPlayer.muted);
  const volume = useSelector((state: RootState) => state.videoPlayer.volume);
  const dispatch = useDispatch();
  const volumeIconClassName = useMemo(() => {
    if (muted || volume === 0) {
      return 'fa-solid fa-volume-xmark';
    }
    if (volume <= 0.5) {
      return 'fa-solid fa-volume-low';
    }
    return 'fa-solid fa-volume-high';
  }, [volume, muted]);
  const onVolumeControllerButtonClick = useCallback(() => {
    dispatch(toggleVideoIsMuted());
  }, []);

  return (
    <VideoPlayer.ControllerButton
      onClick={onVolumeControllerButtonClick}
      iconClassName={volumeIconClassName}
    />
  );
};

VideoPlayer.VolumeRangeInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const muted = useSelector((state: RootState) => state.videoPlayer.muted);
  const volume = useSelector((state: RootState) => state.videoPlayer.volume);
  const dispatch = useDispatch();
  useEffect(() => {
    if (ref.current) {
      const inputElement = ref.current as HTMLInputElement;
      inputElement.onchange = () => {
        dispatch(setVolume(+inputElement.value));
      };
    }
  }, [ref.current]);

  useEffect(() => {
    if (ref.current) {
      if (muted) {
        ref.current.value = `${0}`;
      } else {
        ref.current.value = `${volume}`;
      }
    }
  }, [muted, ref.current]);

  return <input type="range" min={0} max={1} step={0.01} ref={ref} />;
};

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

export default VideoPlayer;
