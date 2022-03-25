/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {useVideosFilterQueries} from '../../../@hooks/useVideosFilterQueries';
import {
  useVideosQuery,
  VideosQueryType,
} from '../../../@queries/useVideosQuery';
import routes from '../../../routes';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useSearchPage = (): ReturnType => {
  const navigate = useNavigate();
  const urlQuery = useUrlQuery();
  const {sortMethod, uploadTime} = useVideosFilterQueries();
  const keyword = urlQuery.get('keyword');

  const videosQueryParams = useMemo(() => {
    return {
      sortMethod,
      uploadTime,
      keyword: keyword || undefined,
    };
  }, [sortMethod, uploadTime, keyword]);

  const videosQuery = useVideosQuery(videosQueryParams);

  useEffect(() => {
    if (!keyword) {
      navigate(routes.home);
    }
  }, [keyword]);

  return {
    videosQuery,
  };
};
