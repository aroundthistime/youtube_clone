/* eslint-disable import/prefer-default-export */
import {useHistoryQuery} from '../../../../@queries/useFeedQuery';
import {VideosQueryType} from '../../../../@queries/useVideosQuery';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useHistoryPage = (): ReturnType => {
  const videosQuery = useHistoryQuery();

  return {
    videosQuery,
  };
};
