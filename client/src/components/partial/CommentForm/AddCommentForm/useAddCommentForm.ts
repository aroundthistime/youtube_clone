/* eslint-disable import/prefer-default-export */
import {useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useInput} from '../../../../@hooks/useInput';
import {addComment} from '../../../../@modules/commentsSlice';
import {RootState} from '../../../../@modules/root';
import {useAddCommentMutation} from '../../../../@queries/useCommentMutation';
import constants from '../../../../constants';
import {
  showErrorToastAfterLoading,
  showLoadingToast,
  showSuccessToastAfterLoading,
} from '../../../../utils/toastUtils';
import {CommentFormProps} from '../CommentForm';

type ReturnType = CommentFormProps | null;

export const useAddCommentForm = (): ReturnType => {
  const video = useSelector((state: RootState) => state.playingVideo);
  if (!video) return null;
  const commentInput = useInput<HTMLTextAreaElement>('');
  const {mutateAsync, data, isLoading} = useAddCommentMutation();
  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (isLoading) return;
    const toastId = showLoadingToast();
    const addCommentRequirements = extractAddCommentRequirements();
    try {
      await mutateAsync(addCommentRequirements);
      showSuccessToastAfterLoading(toastId, constants.messages.addedComment);
      clearTextArea();
    } catch (error) {
      showErrorToastAfterLoading(toastId);
    }
  };

  const extractAddCommentRequirements = useCallback(() => {
    return {
      videoId: video._id,
      text: commentInput.value,
    };
  }, [commentInput, video?._id]);

  const clearTextArea = useCallback(() => {
    commentInput.setValue('');
  }, [commentInput.setValue]);

  useEffect(() => {
    if (data?.result && data?.comment) {
      dispatch(addComment(data.comment));
    }
  }, [data?.result, data?.comment]);

  return {
    onSubmit,
    onCancel: clearTextArea,
    commentInput,
  };
};
