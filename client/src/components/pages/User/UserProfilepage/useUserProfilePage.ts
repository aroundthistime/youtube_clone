/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useVideosFilterQueries} from '../../../../@hooks/useVideosFilterQueries';
import {useUserProfileQuery} from '../../../../@queries/useProfileQuery';
import {
  useUserVideosQuery,
  VideosQueryType,
} from '../../../../@queries/useVideosQuery';
import {UserType} from '../../../../@types/UserType';
import {getUserIdFromPathname} from '../../../../utils/urlHandler';

type ReturnType = {
  user: UserType;
  videosQuery?: VideosQueryType;
};

export const useUserProfilePage = (): ReturnType => {
  const location = useLocation();
  const userId = useMemo(
    () => getUserIdFromPathname(location.pathname),
    [location.pathname],
  ) as string;
  const {
    data: {user},
  } = useUserProfileQuery(userId);

  const {sortMethod, uploadTime} = useVideosFilterQueries();
  const videosQueryParams = useMemo(() => {
    return {
      sortMethod,
      uploadTime,
      userId: user._id,
    };
  }, [sortMethod, uploadTime, user?.id]);

  const videosQuery = useUserVideosQuery(videosQueryParams);

  return {
    user,
    videosQuery,
  };
};
