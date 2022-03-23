/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {
  GetVideoSuccess,
  useVideosQuery,
} from '../../../@queries/useVideosQuery';
import {BriefVideoType} from '../../../@types/VideoType';

type ReturnType = {
  videos: BriefVideoType[];
  isFetchingNextPage: boolean;
};

export const useHomePage = (): ReturnType => {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useVideosQuery();

  const videos = useMemo(() => {
    return data?.pages
      .filter((page): page is GetVideoSuccess => {
        return page.result;
      })
      .map(page => page.videos)
      .flat();
  }, [data]);

  useLazyInfiniteScroll(
    videos,
    'video',
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  return {
    videos: videos || [],
    isFetchingNextPage,
  };
};
