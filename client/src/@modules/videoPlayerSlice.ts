import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VideoType} from '../@types/VideoType';

interface VideoPlayerState {
  status: 'playing' | 'paused' | 'ended';
  duration: number;
  currentTime: number;
  playbackRate: number;
  isFullScreen: boolean;
  volume: number;
  muted: boolean;
}

const initialState = {
  status: 'playing',
  duration: 1,
  currentTime: 0,
  playbackRate: 1,
  isFullScreen: false,
  volume: 1,
  muted: false,
} as VideoPlayerState;

const videoPlayerSlice = createSlice({
  name: 'playingVideo',
  initialState,
  reducers: {
    playVideo(state) {
      return {
        ...state,
        status: 'playing',
      };
    },
    pauseVideo(state) {
      return {
        ...state,
        status: 'paused',
      };
    },
    endVideo(state) {
      return {
        ...state,
        status: 'ended',
      };
    },
    togglePlayVideo(state) {
      return {
        ...state,
        status: state.status === 'playing' ? 'paused' : 'playing',
      };
    },
    setPlaybackRate(state, {payload}: PayloadAction<number>) {
      return {
        ...state,
        playbackRate: payload,
      };
    },
    toggleVideoIsFullScreen(state) {
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };
    },
    muteVideo(state) {
      return {
        ...state,
        muted: true,
      };
    },
    toggleVideoIsMuted(state) {
      return {
        ...state,
        volume: state.muted && state.volume === 0 ? 1 : state.volume,
        muted: !state.muted,
      };
    },
    setVolume(state, {payload}: PayloadAction<number>) {
      if (payload === 0) {
        return {
          ...state,
          muted: true,
          volume: payload,
        };
      }
      if (payload > 0 && payload <= 1) {
        return {
          ...state,
          muted: false,
          volume: payload,
        };
      }
      return state;
    },
  },
});

export const {
  playVideo,
  pauseVideo,
  endVideo,
  togglePlayVideo,
  toggleVideoIsFullScreen,
  toggleVideoIsMuted,
  muteVideo,
  setPlaybackRate,
  setVolume,
} = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
