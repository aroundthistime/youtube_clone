import React, {Suspense} from 'react';
import {useDispatch} from 'react-redux';
import {setCommentsSortMethod} from '../../../@modules/commentsSortMethodSlice';
import {
  CommentSortMethodType,
  COMMENT_SORT_METHODS,
} from '../../../@types/SortMethodType';
import {getCommaAddedNumber} from '../../../utils/mathHandler';
import Loader from '../../atom/Loader/Loader';
import Comment from '../Comment/Comment';
import FetchMoreIndicator from '../FetchMoreIndicator/FetchMoreIndicator';
import {useComments} from './useComments';

type Props = {
  videoId: string;
};

const Comments = ({videoId}: Props) => {
  const {comments, isFetchingNextPage} = useComments(videoId);
  return (
    <Suspense fallback={<Loader />}>
      <ul className="comments">
        {comments.map(comment => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </ul>
      {isFetchingNextPage && <FetchMoreIndicator />}
    </Suspense>
  );
};

export default React.memo(Comments);
