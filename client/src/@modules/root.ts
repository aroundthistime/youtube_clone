import {combineReducers} from '@reduxjs/toolkit';
import user from './userSlice';
import categories from './categoriesSlice';
import playingVideo from './playingVideoSlice';

const rootReducer = combineReducers({
  user,
  categories,
  playingVideo,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
