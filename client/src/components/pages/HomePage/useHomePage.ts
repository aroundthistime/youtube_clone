/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLazyInfiniteScroll} from '../../../@hooks/useLazyInfiniteScroll';
import {useVideosQuery} from '../../../@queries/useVideosQuery';
import {GetVideosSuccess} from '../../../@types/QueryParamsType';
import {BriefVideoType} from '../../../@types/VideoType';
import {getVideosFromData} from '../../../utils/fetchHandlers';

type ReturnType = {
  videos: BriefVideoType[];
  isFetchingNextPage: boolean;
};

export const useHomePage = (): ReturnType => {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useVideosQuery();

  const videos = useMemo(() => getVideosFromData(data), [data]);

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
