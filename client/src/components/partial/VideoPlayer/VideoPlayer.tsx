/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
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
  pauseVideo,
  playVideo,
  setVolume,
  toggleVideoIsMuted,
  useCinemaScreen,
  useDefaultScreen,
  useFullScreen,
  setCurrentTime,
  endVideo,
} from '../../../@modules/videoPlayerSlice';
import {VideoType} from '../../../@types/VideoType';
import {getTimestampFromSeconds} from '../../../utils/dateHandler';
import {useVideoPlayer} from './useVideoPlayer';
import './VideoPlayer.scss';

interface IVideoPlayer
  extends React.MemoExoticComponent<
    ({video, className, children}: PropsWithChildren<Props>) => JSX.Element
  > {
  ProgressBar: React.FC<ProgressBarProps>;
  Controller: React.FC<{}>;
  ControllerButton: React.FC<VideoControllerButtonProps>;
  PlayPauseButton: React.FC<{}>;
  PlayButton: React.FC<{}>;
  PauseButton: React.FC<{}>;
  RewindButton: React.FC<{}>;
  VolumeController: React.FC<{}>;
  VolumeButton: React.FC<{}>;
  VolumeRangeInput: React.FC<{}>;
  Timestamp: React.FC<{}>;
  CurrentTime: React.FC<{}>;
  TotalTime: React.FC<{}>;
  ViewModeButtons: React.FC<{}>;
  DefaultViewButton: React.FC<{}>;
  CinemaViewButton: React.FC<{}>;
  FullscreenButton: React.FC<{}>;
}

type Props = {
  video: VideoType;
  className?: string;
};

const VideoPlayer = React.memo(
  ({video, className = '', children}: PropsWithChildren<Props>) => {
    const {videoRef, videoPlayerRef} = useVideoPlayer(video);
    return (
      <div
        className={`video-player ${className}`}
        ref={videoPlayerRef}
        tabIndex={0}>
        <video
          className="video-player__video"
          src={process.env.REACT_APP_BASE_URL + video.fileUrl}
          ref={videoRef}
          autoPlay
          muted
          preload="auto"
          playsInline
        />
        <VideoPlayer.ProgressBar videoRef={videoRef} />
        {children}
      </div>
    );
  },
) as IVideoPlayer;

type ProgressBarProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

VideoPlayer.ProgressBar = React.memo(({videoRef}: ProgressBarProps) => {
  const [value, setValue] = useState<number>(0);
  const duration = useSelector(
    (state: RootState) => state.videoPlayer.duration,
  );
  const currentTime = useSelector(
    (state: RootState) => state.videoPlayer.currentTime,
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setValue(currentTime / duration);
  // }, [duration, currentTime]);
  useEffect(() => {
    setValue(currentTime);
  }, [currentTime]);

  const STEP = useMemo(() => 0.1, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (videoRef.current) {
      const inputValue = +event.target.value;
      const newCurrentTime =
        duration - inputValue < STEP ? duration : inputValue;
      videoRef.current.currentTime = newCurrentTime;
    }
  };

  const onMouseDown = useCallback(() => dispatch(pauseVideo()), []);

  const onMouseUp = useCallback(() => dispatch(playVideo()), []);

  return (
    <label className="video-player__progress-bar-area">
      <input
        className="video-player__progress-bar"
        type="range"
        value={value}
        min={0}
        max={duration}
        step={STEP}
        onChange={onChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </label>
  );
  // const percentage = useMemo(() => {
  //   return (currentTime / duration) * 100;
  // }, [duration, currentTime]);
  // const onProgressBarClick: React.MouseEventHandler<HTMLDivElement> = event => {
  //   if (ref.current && videoRef.current) {
  //     const progressBarWidth = ref.current.clientWidth;
  //     console.log(progressBarWidth, event.nativeEvent.offsetX);
  //     const newCurrentTime =
  //       duration * (event.nativeEvent.offsetX / progressBarWidth);
  //     videoRef.current.currentTime = newCurrentTime;
  //   }
  // };
  // return (
  //   <div className="video-player__progress-bar-area">
  //     <div
  //       className="video-player__progress-bar"
  //       onClick={onProgressBarClick}
  //       ref={ref}>
  //       <div
  //         className="progress-bar__current"
  //         style={{width: `${percentage}%`}}>
  //         <div className="current__marker" />
  //       </div>
  //     </div>
  //   </div>
  // );
});

VideoPlayer.Controller = () => (
  <div className="video-player__controller">
    <div className="controller__column">
      <VideoPlayer.PlayPauseButton />
      <VideoPlayer.VolumeController />
      <VideoPlayer.Timestamp />
    </div>
    <div className="controller__column">
      <VideoPlayer.ViewModeButtons />
    </div>
  </div>
);

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
      className="volume-controller__volume-button"
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

  return (
    <input
      className="volume-controller__volume-input"
      type="range"
      min={0}
      max={1}
      step={0.01}
      ref={ref}
    />
  );
};

VideoPlayer.Timestamp = () => (
  <div className="video-player__timestamp">
    <VideoPlayer.CurrentTime />
    <VideoPlayer.TotalTime />
  </div>
);

VideoPlayer.CurrentTime = () => {
  const currentTime = useSelector(
    (state: RootState) => state.videoPlayer.currentTime,
  );
  return (
    <span className="timestamp__time timestamp__current-time">
      {getTimestampFromSeconds(currentTime)}
    </span>
  );
};

VideoPlayer.TotalTime = () => {
  const duration = useSelector(
    (state: RootState) => state.videoPlayer.duration,
  );
  return (
    <span className="timestamp__time timestamp__total-time">
      {getTimestampFromSeconds(duration)}
    </span>
  );
};

VideoPlayer.ViewModeButtons = () => {
  const viewMode = useSelector(
    (state: RootState) => state.videoPlayer.viewMode,
  );
  if (viewMode === 'default') {
    return (
      <>
        <VideoPlayer.CinemaViewButton />
        <VideoPlayer.FullscreenButton />
      </>
    );
  }
  if (viewMode === 'cinema') {
    return (
      <>
        <VideoPlayer.DefaultViewButton />
        <VideoPlayer.FullscreenButton />
      </>
    );
  }
  return <VideoPlayer.DefaultViewButton />;
};

VideoPlayer.DefaultViewButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(useDefaultScreen());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-compress"
    />
  );
};

VideoPlayer.CinemaViewButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(useCinemaScreen());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-film"
      className="view-controller__cinema-button"
    />
  );
};

VideoPlayer.FullscreenButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(useFullScreen());
  }, []);
  return (
    <VideoPlayer.ControllerButton
      onClick={onClick}
      iconClassName="fa-solid fa-expand"
    />
  );
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
