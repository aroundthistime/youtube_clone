import React from 'react';
import WithSuspense from '../../wrapper/WithSuspense/WithSuspense';
import Comment from '../Comment/Comment';
import FetchMoreIndicator from '../FetchMoreIndicator/FetchMoreIndicator';
import {useComments} from './useComments';
import './Comments.scss';
import EmptyContent from '../../atom/EmptyContent/EmptyContent';

const Comments = () => {
  const useCommentResult = useComments();
  if (!useCommentResult) return null;
  const {comments, isFetchingNextPage} = useCommentResult;
  return (
    <>
      <ul className="comments">
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment comment={comment} key={comment._id} />
          ))
        ) : (
          <EmptyContent message="댓글이 아직 없습니다" />
        )}
      </ul>
      {isFetchingNextPage && <FetchMoreIndicator />}
    </>
  );
};

export default React.memo(WithSuspense(Comments));
