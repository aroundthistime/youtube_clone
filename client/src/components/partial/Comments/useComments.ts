/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {setComments} from '../../../@modules/commentsSlice';
import {RootState} from '../../../@modules/root';
import {useCommentsQuery} from '../../../@queries/useCommentsQuery';
import {CommentType} from '../../../@types/CommentType';
import {getCommentsFromData} from '../../../utils/fetchHandlers';

type ReturnType = null | {
  comments: CommentType[];
  isFetchingNextPage: boolean;
};

export const useComments = (): ReturnType => {
  const video = useSelector((state: RootState) => state.playingVideo);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const commentsSortMethod = useSelector(
    (state: RootState) => state.comments.sortMethod,
  );
  const dispatch = useDispatch();

  if (!video) return null;

  const queryParams = useMemo(() => {
    return {
      sortMethod: commentsSortMethod,
      videoId: video._id,
    };
  }, [commentsSortMethod, video._id]);

  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useCommentsQuery(queryParams);

  useEffect(() => {
    const fetchedComments = getCommentsFromData(data);
    dispatch(setComments(fetchedComments));
  }, [data]);

  const canFetchNextPage = useMemo(
    () => Boolean(hasNextPage && !isFetchingNextPage),
    [hasNextPage, isFetchingNextPage],
  );

  useLazyInfiniteScroll(comments, 'comment', fetchNextPage, canFetchNextPage);

  return {
    comments,
    isFetchingNextPage,
  };
};
