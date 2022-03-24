import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = [] as string[];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, {payload}: PayloadAction<string[]>) {
      return payload;
    },
  },
});

export const {setCategories} = categoriesSlice.actions;

export default categoriesSlice.reducer;
