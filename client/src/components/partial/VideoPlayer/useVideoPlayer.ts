/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayingVideo} from '../../../@modules/playingVideoSlice';
import {RootState} from '../../../@modules/root';
import {
  endVideo,
  playVideo,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleFullScreen,
  togglePlayVideo,
  useDefaultScreen,
} from '../../../@modules/videoPlayerSlice';
import {VideoType} from '../../../@types/VideoType';
import {isMobile} from '../../../utils/browser';

type ReturnType = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoPlayerRef: React.RefObject<HTMLDivElement>;
};

const VIDEO_TIME_CHANGE_UNIT = 5;
const VIDEO_VOLUME_CHANGE_UNIT = 0.05;

export const useVideoPlayer = (video: VideoType): ReturnType => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const videoElement = videoRef.current;
  const videoPlayer = useSelector((state: RootState) => state.videoPlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlayingVideo(video));
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
        videoElement.currentTime = Math.max(
          videoElement.currentTime - VIDEO_TIME_CHANGE_UNIT,
          0,
        );
      } else if (key === 'ArrowRight') {
        videoElement.currentTime = Math.min(
          videoElement.currentTime + VIDEO_TIME_CHANGE_UNIT,
          videoElement.duration,
        );
      } else if (key === 'ArrowUp') {
        dispatch(
          setVolume(Math.min(videoPlayer.volume + VIDEO_VOLUME_CHANGE_UNIT, 1)),
        );
      } else if (key === 'ArrowDown') {
        dispatch(
          setVolume(Math.max(videoPlayer.volume - VIDEO_VOLUME_CHANGE_UNIT, 0)),
        );
      }
    }
  };

  return {
    videoRef,
    videoPlayerRef,
  };
};
