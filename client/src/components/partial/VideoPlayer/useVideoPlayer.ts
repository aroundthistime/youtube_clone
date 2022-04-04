/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import {
  endVideo,
  playVideo,
  resetVideoPlayer,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleFullScreen,
  togglePlayVideo,
  toggleVideoIsMuted,
  useDefaultScreen,
} from '../../../@modules/videoPlayerSlice';
import {isMobile} from '../../../utils/browser';

type ReturnType = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoPlayerRef: React.RefObject<HTMLDivElement>;
  overlayEffectRef: React.RefObject<HTMLDivElement>;
};

const VIDEO_TIME_CHANGE_UNIT = 5;
const VIDEO_VOLUME_CHANGE_UNIT = 0.05;

const OVERLAY_EFFECT_ICONS = {
  play: 'fa-solid fa-play',
  pause: 'fa-solid fa-pause',
  volumeUp: 'fa-solid fa-volume-high',
  volumeDown: 'fa-solid fa-volume-low',
  mute: 'fa-solid fa-volume-xmark',
  unmute: 'fa-solid fa-volume-high',
  backward: 'fa-solid fa-backward',
  forward: 'fa-solid fa-forward',
} as const;

type OverlayEffectTypes = keyof typeof OVERLAY_EFFECT_ICONS;

export const useVideoPlayer = (): ReturnType => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const overlayEffectRef = useRef<HTMLDivElement>(null);
  const videoElement = videoRef.current;
  const videoPlayer = useSelector((state: RootState) => state.videoPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetVideoPlayer());
  }, []);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.onfullscreenchange = onFullScreenExit;
      videoPlayerRef.current.onkeydown = onVideoPlayerKeydown;
    }
  }, [videoPlayerRef.current]);

  useEffect(() => {
    if (videoElement) {
      videoElement.onended = () => dispatch(endVideo());
      videoElement.onclick = requestTogglePlayVideo;
      videoElement.ondblclick = requestToggleFullScreen;
      videoElement.ontimeupdate = saveVideoCurrentTime;
      videoElement.onloadedmetadata = () =>
        dispatch(setDuration(videoElement.duration));
    }
  }, [videoElement]);

  useEffect(() => {
    if (videoPlayer.status === 'playing') {
      animateOverlayEffect('play');
      videoElement?.play();
    } else {
      animateOverlayEffect('pause');
      videoElement?.pause();
    }
  }, [videoPlayer.status]);

  useEffect(() => {
    if (videoElement) {
      videoElement.muted = videoPlayer.muted;
      videoElement.volume = videoPlayer.volume;
      animateOverlayEffect(videoElement.muted ? 'mute' : 'unmute');
    }
  }, [videoPlayer.volume, videoPlayer.muted, videoElement]);

  useEffect(() => {
    if (videoElement) {
      videoElement.playbackRate = videoPlayer.playbackRate;
    }
  }, [videoPlayer.playbackRate]);

  useEffect(() => {
    if (videoPlayerRef.current && videoPlayer.viewMode === 'fullscreen') {
      videoPlayerRef.current.requestFullscreen();
      if (isMobile()) {
        window.screen.orientation.lock('landscape');
      }
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      if (isMobile()) {
        window.screen.orientation.unlock();
      }
    }
    if (videoPlayerRef.current) {
      videoPlayerRef.current.dataset.viewMode = videoPlayer.viewMode;
    }
  }, [videoPlayer.viewMode]);

  useEffect(() => {
    const tryingToRewindEndedVideo =
      !videoElement?.ended && videoPlayer.status === 'ended';
    if (tryingToRewindEndedVideo) {
      dispatch(playVideo());
    }
  }, [videoElement?.ended, videoPlayer.status]);

  const requestTogglePlayVideo = () => {
    dispatch(togglePlayVideo());
  };

  const requestToggleFullScreen = () => {
    dispatch(toggleFullScreen());
  };

  const saveVideoCurrentTime = () => {
    if (videoElement) {
      dispatch(setCurrentTime(videoElement.currentTime));
    }
  };

  const onFullScreenExit = useCallback(() => {
    if (!document.fullscreenElement) {
      dispatch(useDefaultScreen());
    }
  }, []);

  const onVideoPlayerKeydown = (event: KeyboardEvent) => {
    const {key} = event;
    if (videoElement) {
      if (key === ' ') {
        dispatch(togglePlayVideo());
      } else if (key === 'ArrowLeft') {
        animateOverlayEffect('backward');
        videoElement.currentTime = Math.max(
          videoElement.currentTime - VIDEO_TIME_CHANGE_UNIT,
          0,
        );
      } else if (key === 'ArrowRight') {
        animateOverlayEffect('forward');
        videoElement.currentTime = Math.min(
          videoElement.currentTime + VIDEO_TIME_CHANGE_UNIT,
          videoElement.duration,
        );
      } else if (key === 'ArrowUp') {
        animateOverlayEffect('volumeUp');
        dispatch(
          setVolume(Math.min(videoPlayer.volume + VIDEO_VOLUME_CHANGE_UNIT, 1)),
        );
      } else if (key === 'ArrowDown') {
        animateOverlayEffect('volumeDown');
        dispatch(
          setVolume(Math.max(videoPlayer.volume - VIDEO_VOLUME_CHANGE_UNIT, 0)),
        );
      } else if (key === 'm' || key === 'M') {
        dispatch(toggleVideoIsMuted());
      }
    }
  };

  const animateOverlayEffect = useCallback(
    (effect: OverlayEffectTypes) => {
      if (!overlayEffectRef.current) return;
      const overlayEffectIcon = overlayEffectRef.current.querySelector(
        'i',
      ) as HTMLLIElement;
      overlayEffectIcon.className = OVERLAY_EFFECT_ICONS[effect];
      overlayEffectRef.current.animate(
        [
          {opacity: 0},
          {
            opacity: 1,
            offset: 0.1,
          },
          {opacity: 0, offset: 0.95},
        ],
        1000,
      );
    },
    [overlayEffectRef.current],
  );

  return {
    videoRef,
    videoPlayerRef,
    overlayEffectRef,
  };
};
