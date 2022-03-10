import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../@types/UserType';

export type UserState = UserType | null;

const initialState = null as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, {payload}: PayloadAction<UserType>) {
      return payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
