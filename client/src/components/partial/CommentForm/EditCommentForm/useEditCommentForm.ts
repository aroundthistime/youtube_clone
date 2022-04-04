/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {editComment} from '../../../../@modules/commentsSlice';
import {useEditCommentMutation} from '../../../../@queries/useCommentMutation';
import {CommentType} from '../../../../@types/CommentType';
import constants from '../../../../constants';

export const useEditCommentForm = (
  comment: CommentType,
  closeEditMode: () => void,
) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {mutateAsync, data, isLoading} = useEditCommentMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    resetTextArea();
  }, [textAreaRef.current]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!textAreaRef.current) return;
    if (isLoading) return;
    const editCommentRequirements = {
      id: comment._id,
      text: textAreaRef.current.value,
    };
    try {
      await mutateAsync(editCommentRequirements);
      closeEditMode();
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  };

  useEffect(() => {
    if (data?.comment) {
      dispatch(editComment(data.comment));
      toast.success(constants.messages.editedComment);
    }
  }, [data?.comment]);

  const onCancel = useCallback(() => {
    resetTextArea();
    closeEditMode();
  }, [textAreaRef.current, closeEditMode]);

  const resetTextArea = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = comment.text;
    }
  }, [textAreaRef.current]);

  return {
    onSubmit,
    onCancel,
    textAreaRef,
  };
};
