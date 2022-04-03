import React from 'react';
import CommentForm from '../CommentForm';
import {useAddCommentForm} from './useAddCommentForm';

const AddCommentForm = () => {
  const useAddCommentFormResult = useAddCommentForm();
  if (!useAddCommentFormResult) {
    return null;
  }
  const {onSubmit, onCancel, textAreaRef} = useAddCommentFormResult;
  return (
    <CommentForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      textAreaRef={textAreaRef}
      className="add-comment-form"
    />
  );
};

export default React.memo(AddCommentForm);
