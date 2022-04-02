import {combineReducers} from '@reduxjs/toolkit';
import user from './userSlice';
import categories from './categoriesSlice';
import playingVideo from './playingVideoSlice';
import videoPlayer from './videoPlayerSlice';
import commentsSortMethod from './commentsSortMethodSlice';

const rootReducer = combineReducers({
  user,
  categories,
  playingVideo,
  videoPlayer,
  commentsSortMethod,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
