import {combineReducers} from '@reduxjs/toolkit';
import user from './userSlice';
import categories from './categoriesSlice';

const rootReducer = combineReducers({
  user,
  categories,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
