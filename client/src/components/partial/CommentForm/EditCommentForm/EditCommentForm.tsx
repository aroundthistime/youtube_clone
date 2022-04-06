import React from 'react';
import CommentForm from '../CommentForm';
import {CommentType} from '../../../../@types/CommentType';
import {useEditCommentForm} from './useEditCommentForm';

type Props = {
  comment: CommentType;
  closeEditMode: () => void;
};

const EditCommentForm = ({comment, closeEditMode}: Props) => {
  const {onSubmit, onCancel, commentInput} = useEditCommentForm(
    comment,
    closeEditMode,
  );
  return (
    <CommentForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      commentInput={commentInput}
      className="edit-comment-form"
    />
  );
};

export default React.memo(EditCommentForm);
