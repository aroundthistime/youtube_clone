import {combineReducers} from '@reduxjs/toolkit';
import user from './userSlice';
import categories from './categoriesSlice';
import playingVideo from './playingVideoSlice';
import videoPlayer from './videoPlayerSlice';

const rootReducer = combineReducers({
  user,
  categories,
  playingVideo,
  videoPlayer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
