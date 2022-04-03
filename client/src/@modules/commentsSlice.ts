import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentType} from '../@types/CommentType';
import {CommentSortMethodType} from '../@types/SortMethodType';

type CommentsType = {
  comments: CommentType[];
  sortMethod: CommentSortMethodType;
};

const initialState: CommentsType = {
  comments: [],
  sortMethod: 'Newest' as CommentSortMethodType,
};

const commentsSlice = createSlice({
  name: 'commentsSortMethod',
  initialState,
  reducers: {
    setComments(state, {payload}: PayloadAction<CommentType[]>) {
      return {
        ...state,
        comments: payload,
      };
    },
    addComment(state, {payload}: PayloadAction<CommentType>) {
      state.comments.unshift(payload);
    },
    editComment(state, {payload}: PayloadAction<CommentType>) {
      const newComments = state.comments.map(comment => {
        return comment._id === payload._id ? payload : comment;
      });
      return {
        ...state,
        comments: newComments,
      };
    },
    clearComments(state) {
      return {
        ...state,
        comments: [],
      };
    },
    deleteComment(state, {payload}: PayloadAction<string>) {
      const filteredComments = state.comments.filter(
        comment => comment._id !== payload,
      );
      return {
        ...state,
        comments: filteredComments,
      };
    },
    setCommentsSortMethod(
      state,
      {payload}: PayloadAction<CommentSortMethodType>,
    ) {
      return {
        ...state,
        sortMethod: payload,
      };
    },
    resetCommentsSortMethod(state) {
      return {
        ...state,
        sortMethod: 'Newest' as CommentSortMethodType,
      };
    },
  },
});

export const {
  setComments,
  clearComments,
  addComment,
  deleteComment,
  setCommentsSortMethod,
  resetCommentsSortMethod,
} = commentsSlice.actions;

export default commentsSlice.reducer;
