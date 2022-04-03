import React from 'react';
import {CommentType} from '../../../@types/CommentType';
import {getTextWithLinebreaks} from '../../../utils/stringUtils';
import EllipsisButton from '../../atom/Button/EllipsisButton/EllipsisButton';
import UserAvatarLink from '../../atom/Links/UserAvatarLink/UserAvatarLink';
import './Comment.scss';

type Props = {
  comment: CommentType;
};

const Comment = ({comment}: Props) => {
  return (
    <div className="comment">
      <UserAvatarLink user={comment.creator} className="comment__creator" />
      <div className="comment__content">
        {getTextWithLinebreaks(comment.text)}
      </div>
      <div className="comment__config-button">
        <EllipsisButton onClick={() => 1} />
      </div>
    </div>
  );
};

export default React.memo(Comment);
