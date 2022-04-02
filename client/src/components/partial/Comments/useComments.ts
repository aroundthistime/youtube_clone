/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {RootState} from '../../../@modules/root';
import {useCommentsQuery} from '../../../@queries/useCommentsQuery';
import {CommentType} from '../../../@types/CommentType';
import {getCommentsFromData} from '../../../utils/fetchHandlers';

type ReturnType = {
  comments: CommentType[];
  isFetchingNextPage: boolean;
};

export const useComments = (videoId: string): ReturnType => {
  const commentsSortMethod = useSelector(
    (state: RootState) => state.commentsSortMethod,
  );
  const queryParams = useMemo(() => {
    return {
      sortMethod: commentsSortMethod,
      videoId,
    };
  }, [commentsSortMethod, videoId]);
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useCommentsQuery(queryParams);

  const comments = useMemo(() => getCommentsFromData(data), [data]);

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
