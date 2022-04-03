import React from 'react';
import {CommentType} from '../../../@types/CommentType';
import {getTextWithLinebreaks} from '../../../utils/stringUtils';

type Props = {
  comment: CommentType;
};

const Comment = ({comment}: Props) => {
  return <div className="comment">{getTextWithLinebreaks(comment.text)}</div>;
};

export default React.memo(Comment);
