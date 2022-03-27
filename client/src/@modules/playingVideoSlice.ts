import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {VideoType} from '../@types/VideoType';

type PlayingVideoState = VideoType | null;

const initialState = null as PlayingVideoState;

const playingVideoSlice = createSlice({
  name: 'playingVideo',
  initialState,
  reducers: {
    setPlayingVideo(_, {payload}: PayloadAction<VideoType>) {
      return payload;
    },
    clearPlayingVideo() {
      return null;
    },
  },
});

export const {setPlayingVideo, clearPlayingVideo} = playingVideoSlice.actions;

export default playingVideoSlice.reducer;
