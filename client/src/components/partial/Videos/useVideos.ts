/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {VideosQueryType} from '../../../@queries/useVideosQuery';
import {BriefVideoType} from '../../../@types/VideoType';
import {getVideosFromData} from '../../../utils/fetchHandlers';

type ReturnType = {
  videos: BriefVideoType[];
  isFetchingNextPage: boolean;
};

export const useVideos = (videosQuery: VideosQueryType): ReturnType => {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} = videosQuery;

  const videos = useMemo(() => getVideosFromData(data), [data]);

  const canFetchNextPage = useMemo(
    () => Boolean(hasNextPage && !isFetchingNextPage),
    [hasNextPage, isFetchingNextPage],
  );
  useLazyInfiniteScroll(videos, 'video', fetchNextPage, canFetchNextPage);

  return {
    videos,
    isFetchingNextPage,
  };
};
