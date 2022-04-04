/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {usePopup} from '../../../@hooks/usePopup';
import {RootState} from '../../../@modules/root';
import {CommentType} from '../../../@types/CommentType';

type ReturnType = {
  isLoggedIn: boolean;
  popupRef: React.RefObject<HTMLDivElement>;
  showByButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  isMyComment: boolean;
  useEditMode: boolean;
  closeEditMode: () => void;
  openEditMode: React.MouseEventHandler<HTMLButtonElement>;
};

export const useComment = (comment: CommentType): ReturnType => {
  const user = useSelector((state: RootState) => state.user);
  const [useEditMode, setUseEditMode] = useState<boolean>(false);

  const isMyComment = useMemo(() => comment.creator._id === user?._id, [user]);

  const {ref, showByButtonClick} = usePopup<HTMLDivElement>();

  const openEditMode = useCallback(() => setUseEditMode(true), []);
  const closeEditMode = useCallback(() => setUseEditMode(false), []);

  return {
    isLoggedIn: Boolean(user),
    popupRef: ref,
    isMyComment,
    showByButtonClick,
    openEditMode,
    closeEditMode,
    useEditMode,
  };
};
