import React, {useEffect, useRef} from 'react';
import {useInput} from '../../../@hooks/useInput';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import WithLoginLink from '../../wrapper/WithLoginLink/WithLoginLink';
import './CommentForm.scss';
import {useCommentForm} from './useCommentForm';

export interface CommentFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  commentInput: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  className?: string;
}

const CommentForm = ({
  onSubmit,
  onCancel,
  commentInput,
  className = '',
}: CommentFormProps) => {
  const {user, submitButtonDisabled} = useCommentForm(commentInput);
  return (
    <div className={`comment-form-container ${className}`}>
      <ProfileImage
        className="add-comment__profile-image"
        isLazyImage={false}
        src={user?.avatarUrl}
      />
      <form className="comment-form" onSubmit={onSubmit}>
        <textarea
          className="comment-form__textarea"
          required
          value={commentInput.value}
          onChange={commentInput.onChange}
        />
        <div className="comment-form__buttons">
          <button
            type="button"
            className="comment-form__button comment-form__cancel-button"
            onClick={onCancel}>
            취소
          </button>
          <button
            type="submit"
            disabled={submitButtonDisabled}
            className={`comment-form__button comment-form__submit-button ${
              submitButtonDisabled ? 'button--disabled' : ''
            }`}>
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithLoginLink(CommentForm);
