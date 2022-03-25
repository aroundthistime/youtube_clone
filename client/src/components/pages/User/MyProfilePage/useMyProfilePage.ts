/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {usePopup} from '../../../../@hooks/usePopup';
import {useVideosFilterQueries} from '../../../../@hooks/useVideosFilterQueries';
import {clearUser} from '../../../../@modules/userSlice';
import {useLogoutQuery} from '../../../../@queries/useLogoutQuery';
import {useMyProfileQuery} from '../../../../@queries/useProfileQuery';
import {
  useMyVideosQuery,
  VideosQueryType,
} from '../../../../@queries/useVideosQuery';
import {UserType} from '../../../../@types/UserType';
import routes from '../../../../routes';
import {PopupButtonProps} from '../../../partial/PopupWithButtons/PopupWithButtons';

type ReturnType = {
  user: UserType;
  popupRef: React.RefObject<HTMLDivElement>;
  showButtonsPopup: React.MouseEventHandler<HTMLButtonElement>;
  videosQuery: VideosQueryType;
};

export const useMyProfilePage = (): ReturnType => {
  const navigate = useNavigate();
  const {ref: popupRef, showByButtonClick: showButtonsPopup} =
    usePopup<HTMLDivElement>();
  const {
    data: {user},
  } = useMyProfileQuery();
  const {sortMethod, uploadTime} = useVideosFilterQueries();
  const videosQueryParams = useMemo(() => {
    return {
      sortMethod,
      uploadTime,
    };
  }, [sortMethod, uploadTime]);

  const videosQuery = useMyVideosQuery(videosQueryParams);

  useEffect(() => {
    if (!user) {
      navigate(routes.login);
    }
  }, [user]);

  return {
    user,
    popupRef,
    showButtonsPopup,
    videosQuery,
  };
};
