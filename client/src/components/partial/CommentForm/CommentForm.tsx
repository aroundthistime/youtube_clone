import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../@modules/root';
import ProfileImage from '../../atom/ProfileImage/ProfileImage';
import WithLoggedInValidation from '../../wrapper/WithLoggedInValidation/WithLoggedInValidation';
import './CommentForm.scss';
import {useCommentForm} from './useCommentForm';

type Props = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  className?: string;
};

const CommentForm = ({
  onSubmit,
  onCancel,
  textAreaRef = useRef<HTMLTextAreaElement>(null),
  className = '',
}: Props) => {
  const {user, submitButtonDisabled} = useCommentForm(textAreaRef);
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
          ref={textAreaRef}
          required
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

export default WithLoggedInValidation(CommentForm);
