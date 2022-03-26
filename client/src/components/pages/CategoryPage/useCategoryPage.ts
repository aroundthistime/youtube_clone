/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useVideosFilterQueries} from '../../../@hooks/useVideosFilterQueries';
import {
  useVideosQuery,
  VideosQueryType,
} from '../../../@queries/useVideosQuery';
import routes from '../../../routes';
import {isValidCategory} from '../../../utils/fetchHandlers';
import {getCurrentCategoryFromPathname} from '../../../utils/urlHandler';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useCategoryPage = (): ReturnType => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentCategory = useMemo(() => {
    return getCurrentCategoryFromPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!isValidCategory(currentCategory)) {
      navigate(routes.home);
    }
  }, [currentCategory]);

  const {sortMethod, uploadTime} = useVideosFilterQueries();
  const videosQueryParams = useMemo(() => {
    return {
      sortMethod,
      uploadTime,
      category: currentCategory,
    };
  }, [sortMethod, uploadTime, currentCategory]);

  const videosQuery = useVideosQuery(videosQueryParams);

  return {
    videosQuery,
  };
};
