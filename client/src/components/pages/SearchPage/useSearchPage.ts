/* eslint-disable import/prefer-default-export */
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {VideosQueryParams} from '../../../@queries/useVideosQuery';
import routes from '../../../routes';

type ReturnType = {
  queryParams: VideosQueryParams;
};

export const useSearchPage = (): ReturnType => {
  const navigate = useNavigate();
  const urlQuery = useUrlQuery();
  const keyword = urlQuery.get('keyword');

  useEffect(() => {
    if (!keyword) {
      navigate(routes.home);
    }
  }, [keyword]);

  return {
    queryParams: {
      keyword: keyword as string,
    },
  };
};
