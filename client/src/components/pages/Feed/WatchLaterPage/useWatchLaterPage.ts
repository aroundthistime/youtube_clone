/* eslint-disable import/prefer-default-export */
import {useWatchLaterQuery} from '../../../../@queries/useFeedQuery';
import {VideosQueryType} from '../../../../@queries/useVideosQuery';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useWatchLaterPage = (): ReturnType => {
  const videosQuery = useWatchLaterQuery();

  return {
    videosQuery,
  };
};
