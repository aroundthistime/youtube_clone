import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentSortMethodType} from '../@types/SortMethodType';

const initialState = 'Newest' as CommentSortMethodType;

const commentsSortMethodSlice = createSlice({
  name: 'commentsSortMethod',
  initialState,
  reducers: {
    setCommentsSortMethod(_, {payload}: PayloadAction<CommentSortMethodType>) {
      return payload;
    },
    resetCommentsSortMethod() {
      return 'Newest' as CommentSortMethodType;
    },
  },
});

export const {setCommentsSortMethod, resetCommentsSortMethod} =
  commentsSortMethodSlice.actions;

export default commentsSortMethodSlice.reducer;
