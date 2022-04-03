import React from 'react';
import WithSuspense from '../../wrapper/WithSuspense/WithSuspense';
import Comment from '../Comment/Comment';
import FetchMoreIndicator from '../FetchMoreIndicator/FetchMoreIndicator';
import {useComments} from './useComments';
import './Comments.scss';

const Comments = () => {
  const useCommentResult = useComments();
  if (!useCommentResult) return null;
  const {comments, isFetchingNextPage} = useCommentResult;
  return (
    <>
      <ul className="comments">
        {comments.map(comment => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </ul>
      {isFetchingNextPage && <FetchMoreIndicator />}
    </>
  );
};

export default React.memo(WithSuspense(Comments));
