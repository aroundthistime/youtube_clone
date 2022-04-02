import React from 'react';
import {CommentType} from '../../../@types/CommentType';

type Props = {
  comment: CommentType;
};

const Comment = ({comment}: Props) => (
  <div className="comment">{comment.text}</div>
);

export default React.memo(Comment);
