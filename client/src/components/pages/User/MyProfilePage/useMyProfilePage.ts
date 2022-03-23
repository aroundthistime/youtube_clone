/* eslint-disable import/prefer-default-export */
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useLazyInfiniteScroll} from '../../../../@hooks/useLazyInfiniteScroll';
import {usePopup} from '../../../../@hooks/usePopup';
import {clearUser} from '../../../../@modules/userSlice';
import {useLogoutQuery} from '../../../../@queries/useLogoutQuery';
import {useMyProfileQuery} from '../../../../@queries/useMyProfileQuery';
import {UserType} from '../../../../@types/UserType';
import {BriefVideoType} from '../../../../@types/VideoType';
import routes from '../../../../routes';
import {getVideosFromData} from '../../../../utils/fetchHandlers';
import {PopupButtonProps} from '../../../partial/PopupWithButtons/PopupWithButtons';

type ReturnType = {
  user: UserType;
  popupRef: React.RefObject<HTMLDivElement>;
  showButtonsPopup: React.MouseEventHandler<HTMLButtonElement>;
  popupButtons: PopupButtonProps[];
  // videos: BriefVideoType[];
};

export const useMyProfilePage = (): ReturnType => {
  const {
    data: {user},
  } = useMyProfileQuery();
  const [executeLogoutQuery] = useLogoutQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {ref: popupRef, showByButtonClick: showButtonsPopup} =
    usePopup<HTMLDivElement>();

  // const videos = useMemo(() => getVideosFromData(myVideosData), [myVideosData]);
  // useLazyInfiniteScroll(
  //   videos,
  //   'video',
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // );

  const onLogoutButtonClick = async () => {
    await executeLogoutQuery();
    dispatch(clearUser());
    navigate(routes.home);
  };

  const popupButtons: PopupButtonProps[] = useMemo(() => {
    return [
      {
        text: '프로필 수정',
        onClick: () => navigate(routes.users + routes.editProfile),
      },
      {
        text: '비밀번호 변경',
        onClick: () => navigate(routes.users + routes.changePasword),
      },
      {
        text: '로그아웃',
        onClick: () => onLogoutButtonClick(),
      },
    ];
  }, [navigate]);

  return {
    user,
    popupRef,
    showButtonsPopup,
    popupButtons,
    // videos,
  };
};
