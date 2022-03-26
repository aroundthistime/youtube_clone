/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {useVideosFilterQueries} from '../../../@hooks/useVideosFilterQueries';
import {RootState} from '../../../@modules/root';
import {
  useVideosQuery,
  VideosQueryType,
} from '../../../@queries/useVideosQuery';
import routes from '../../../routes';
import {getCurrentCategoryFromPathname} from '../../../utils/urlHandler';

type ReturnType = {
  videosQuery: VideosQueryType;
};

export const useCategoryPage = (): ReturnType => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) => state.categories);
  const currentCategory = useMemo(() => {
    return getCurrentCategoryFromPathname(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!currentCategory || !categories.includes(currentCategory)) {
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
