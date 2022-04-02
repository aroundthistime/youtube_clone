/* eslint-disable import/prefer-default-export */
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  resetCommentsSortMethod,
  setCommentsSortMethod,
} from '../../../@modules/commentsSortMethodSlice';
import {CommentSortMethodType} from '../../../@types/SortMethodType';

type ReturnType = {
  onInput: React.FormEventHandler<HTMLSelectElement>;
};

export const useCommentsSortMethodSelector = (): ReturnType => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCommentsSortMethod());
  }, []);

  const onInput: React.FormEventHandler<HTMLSelectElement> = event => {
    const sortMethod = event.currentTarget.value as CommentSortMethodType;
    dispatch(setCommentsSortMethod(sortMethod));
  };

  return {
    onInput,
  };
};
