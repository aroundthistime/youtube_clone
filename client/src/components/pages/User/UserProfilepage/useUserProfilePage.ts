/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {useUserProfileQuery} from '../../../../@queries/useProfileQuery';
import {VideosQueryParams} from '../../../../@queries/useVideosQuery';
import {UserType} from '../../../../@types/UserType';
import {getUserIdFromPathname} from '../../../../utils/urlHandler';

type ReturnType = {
  user: UserType;
  queryParams: VideosQueryParams;
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

  return {
    user,
    queryParams: {
      userId,
    },
  };
};
