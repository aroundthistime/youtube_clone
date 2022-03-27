/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayingVideo} from '../../../@modules/playingVideoSlice';
import {RootState} from '../../../@modules/root';
import {
  endVideo,
  muteVideo,
  pauseVideo,
  playVideo,
  togglePlayVideo,
} from '../../../@modules/videoPlayerSlice';
import {VideoType} from '../../../@types/VideoType';

type ReturnType = {
  videoRef: React.RefObject<HTMLVideoElement>;
};

export const useVideoPlayer = (video: VideoType): ReturnType => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoElement = videoRef.current;
  const videoPlayer = useSelector((state: RootState) => state.videoPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlayingVideo(video));
    dispatch(muteVideo());
    dispatch(playVideo());
  }, []);

  useEffect(() => {
    if (videoElement) {
      videoElement.onended = () => dispatch(endVideo());
      videoElement.onclick = requestTogglePlayVideo;
    }
  }, [videoElement]);

  useEffect(() => {
    if (videoPlayer.status === 'playing') {
      videoElement?.play();
    } else {
      videoElement?.pause();
    }
  }, [videoPlayer.status]);

  useEffect(() => {
    if (videoElement) {
      videoElement.muted = videoPlayer.muted;
      videoElement.volume = videoPlayer.volume;
    }
  }, [videoPlayer.volume, videoPlayer.muted, videoElement]);

  useEffect(() => {
    if (videoElement && videoPlayer.isFullScreen) {
      videoElement.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [videoPlayer.isFullScreen]);

  const requestTogglePlayVideo = () => {
    dispatch(togglePlayVideo());
  };

  return {
    videoRef,
  };
};
