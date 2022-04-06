/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useInput} from '../../../../@hooks/useInput';
import {editComment} from '../../../../@modules/commentsSlice';
import {useEditCommentMutation} from '../../../../@queries/useCommentMutation';
import {CommentType} from '../../../../@types/CommentType';
import constants from '../../../../constants';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';

export const useEditCommentForm = (
  comment: CommentType,
  closeEditMode: () => void,
) => {
  const commentInput = useInput<HTMLTextAreaElement>(comment.text);
  const {mutateAsync, data, isLoading} = useEditCommentMutation();
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!canSubmit()) return;
    const editCommentRequirements = extractEditCommentRequirements();
    const toastId = showLoadingToast();
    try {
      await mutateAsync(editCommentRequirements);
      showSuccessToastAfterLoading(toastId, constants.messages.editedComment);
      closeEditMode();
    } catch {
      showErrorToastAfterLoading(toastId);
    }
  };

  const canSubmit = useCallback((): boolean => {
    if (isLoading) return false;
    return true;
  }, [isLoading]);

  const extractEditCommentRequirements = useCallback(() => {
    const editCommentRequirements = {
      id: comment._id,
      text: commentInput.value,
    };
    return editCommentRequirements;
  }, [commentInput]);

  useEffect(() => {
    if (data?.comment) {
      dispatch(editComment(data.comment));
    }
  }, [data?.comment]);

  const onCancel = useCallback(() => {
    resetTextArea();
    closeEditMode();
  }, [closeEditMode]);

  const resetTextArea = useCallback(() => {
    commentInput.setValue(comment.text);
  }, [commentInput.setValue]);

  return {
    onSubmit,
    onCancel,
    commentInput,
  };
};
