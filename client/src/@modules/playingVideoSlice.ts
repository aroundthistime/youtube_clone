import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VideoType} from '../@types/VideoType';

interface PlayingVideoType {
  video: VideoType;
  currentTime: number;
}

type PlayingVideoState = PlayingVideoType | null;

const initialState = null as PlayingVideoState;

const playingVideoSlice = createSlice({
  name: 'playingVideo',
  initialState,
  reducers: {
    setPlayingVideo(_, {payload}: PayloadAction<PlayingVideoType>) {
      return {
        video: payload.video,
        currentTime: payload.currentTime,
      };
    },
    clearPlayingVideo(_, __) {
      return null;
    },
  },
});

export const {setPlayingVideo, clearPlayingVideo} = playingVideoSlice.actions;

export default playingVideoSlice.reducer;
