/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {addComment} from '../../../../@modules/commentsSlice';
import {RootState} from '../../../../@modules/root';
import {useAddCommentMutation} from '../../../../@queries/useCommentMutation';
import constants from '../../../../constants';
import {CommentFormProps} from '../CommentForm';

type ReturnType = CommentFormProps | null;

export const useAddCommentForm = (): ReturnType => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {mutateAsync, data, isLoading} = useAddCommentMutation();
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (!textAreaRef.current) return;
    if (isLoading) return;
    const addCommentRequirements = {
      videoId: video._id,
      text: textAreaRef.current.value,
    };
    try {
      await mutateAsync(addCommentRequirements);
      toast.success(constants.messages.addedComment);
      clearTextArea();
    } catch (error) {
      toast.error(constants.messages.taskFailed);
    }
  };

  const clearTextArea = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = '';
      textAreaRef.current.dispatchEvent(new InputEvent('input', {data: ''}));
    }
  }, [textAreaRef.current]);

  useEffect(() => {
    if (data?.comment) {
      dispatch(addComment(data.comment));
    }
  }, [data?.comment]);

  return {
    onSubmit,
    onCancel: clearTextArea,
    textAreaRef,
  };
};
