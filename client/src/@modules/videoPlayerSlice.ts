import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface VideoPlayerState {
  status: 'playing' | 'paused' | 'ended';
  duration: number;
  currentTime: number;
  playbackRate: number;
  volume: number;
  muted: boolean;
  viewMode: 'default' | 'cinema' | 'fullscreen';
}

const initialState = {
  status: 'playing',
  duration: 1,
  currentTime: 0,
  playbackRate: 1,
  volume: 1,
  muted: true,
  viewMode: 'default',
} as VideoPlayerState;

const videoPlayerSlice = createSlice({
  name: 'playingVideo',
  initialState,
  reducers: {
    resetVideoPlayer() {
      return initialState;
    },
    setDuration(state, {payload}: PayloadAction<number>) {
      return {
        ...state,
        duration: payload,
      };
    },
    setCurrentTime(state, {payload}: PayloadAction<number>) {
      return {
        ...state,
        currentTime: payload,
      };
    },
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
        currentTime: state.duration,
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
    useFullScreen(state) {
      return {
        ...state,
        viewMode: 'fullscreen',
      };
    },
    useCinemaScreen(state) {
      return {
        ...state,
        viewMode: 'cinema',
      };
    },
    useDefaultScreen(state) {
      return {
        ...state,
        viewMode: 'default',
      };
    },
    toggleFullScreen(state) {
      return {
        ...state,
        viewMode: state.viewMode === 'fullscreen' ? 'default' : 'fullscreen',
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
  toggleVideoIsMuted,
  muteVideo,
  setCurrentTime,
  setDuration,
  setPlaybackRate,
  setVolume,
  resetVideoPlayer,
  useFullScreen,
  useCinemaScreen,
  useDefaultScreen,
  toggleFullScreen,
} = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
