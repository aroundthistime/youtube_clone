import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../@types/UserType';

type UserState = UserType | undefined;

const initialState = undefined as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, {payload}: PayloadAction<UserType>) {
      return payload;
    },
    clearUser() {
      return undefined;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
