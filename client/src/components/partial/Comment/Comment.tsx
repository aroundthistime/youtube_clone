import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {deleteCommentById} from '../../../@modules/commentsSlice';
import {RootState} from '../../../@modules/root';
import {useBlockCommentMutation} from '../../../@queries/useCommentMutation';
import {CommentType} from '../../../@types/CommentType';
import constants from '../../../constants';
import {getTimeDiffFromNowString} from '../../../utils/dateHandler';
import {getTextWithLinebreaks} from '../../../utils/stringUtils';
import EllipsisButton from '../../atom/Button/EllipsisButton/EllipsisButton';
import UserAvatarLink from '../../atom/Links/UserAvatarLink/UserAvatarLink';
import UserNameLink from '../../atom/Links/UserNameLink/UserNameLink';
import EditCommentForm from '../CommentForm/EditCommentForm/EditCommentForm';
import PopupWithButtons from '../PopupWithButtons/PopupWithButtons';
import './Comment.scss';
import {useComment} from './useComment';

type Props = {
  comment: CommentType;
};

const Comment = ({comment}: Props) => {
  const {
    isLoggedIn,
    popupRef,
    showByButtonClick,
    isMyComment,
    timeDiffFromUploadDate,
    useEditMode,
    closeEditMode,
    openEditMode,
  } = useComment(comment);

  return (
    <>
      <div className={`comment ${useEditMode ? 'comment--editing' : ''}`}>
        <UserAvatarLink user={comment.creator} className="comment__creator" />
        <div className="comment__main">
          <div className="comment__header">
            <UserNameLink user={comment.creator} />
            <span className="comment__upload-time">
              {timeDiffFromUploadDate}
            </span>
            {comment.isEdited && <span>(수정됨)</span>}
          </div>
          <div className="comment__content">
            {getTextWithLinebreaks(comment.text)}
          </div>
        </div>
        {isLoggedIn && (
          <>
            <EllipsisButton
              onClick={showByButtonClick}
              className="comment__config-button"
            />
            <PopupWithButtons ref={popupRef} className="comment__popup">
              {isMyComment ? (
                <Comment.EditButton openEditMode={openEditMode} />
              ) : (
                // <Comment.DeleteButton />
                <Comment.BlockButton commentId={comment._id} />
              )}
            </PopupWithButtons>
          </>
        )}
      </div>
      {useEditMode && (
        <EditCommentForm comment={comment} closeEditMode={closeEditMode} />
      )}
    </>
  );
};

type CommentEditButtonProps = {
  openEditMode: React.MouseEventHandler<HTMLButtonElement>;
};

Comment.EditButton = ({openEditMode}: CommentEditButtonProps) => {
  return <PopupWithButtons.Button text="댓글 수정" onClick={openEditMode} />;
};

// type CommentDeleteButtonProps = {};

type CommentBlockButtonProps = {
  commentId: string;
};

Comment.BlockButton = ({commentId}: CommentBlockButtonProps) => {
  const {mutateAsync, data, isLoading} = useBlockCommentMutation();
  const dispatch = useDispatch();

  const onClick = useCallback(async () => {
    if (isLoading) return;
    if (!window.confirm(constants.messages.confirmDeleteComment)) return;
    try {
      await mutateAsync(commentId);
      toast.success(constants.messages.blockedComment);
    } catch {
      toast.error(constants.messages.taskFailed);
    }
  }, []);

  useEffect(() => {
    if (data?.comment) {
      dispatch(deleteCommentById(commentId));
    }
  }, [data?.comment]);

  return <PopupWithButtons.Button onClick={onClick} text="댓글 차단" />;
};

export default React.memo(Comment);
