import React, {useCallback} from 'react';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import PopupWithButtons from '../../../partial/PopupWithButtons/PopupWithButtons';
import './MyProfilePage.scss';
import {useMyProfilePage} from './useMyProfilePage';
import routes from '../../../../routes';
import {useLogoutQuery} from '../../../../@queries/useLogoutQuery';
import {clearUser} from '../../../../@modules/userSlice';
import WithPrivateValidation from '../../../wrapper/WithAuthValidation/WithPrivateValidation';

const DetailUserProfile = React.lazy(
  () => import('../../../partial/DetailUserProfile/DetailUserProfile'),
);
const VideosWithFilterer = React.lazy(
  () => import('../../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const MyProfilePage = () => {
  const {user, popupRef, showButtonsPopup, videosQuery} = useMyProfilePage();
  return (
    <main className="user-profile my-profile">
      <DetailUserProfile
        user={user}
        myProfileButton={
          <MyProfilePage.ConfigButton onClick={showButtonsPopup} />
        }
      />
      <VideosWithFilterer videosQuery={videosQuery} />
      <PopupWithButtons ref={popupRef} className="my-profile__config-popup">
        <MyProfilePage.EditProfileButton />
        <MyProfilePage.ChangePasswordButton />
        <MyProfilePage.LogoutButton />
      </PopupWithButtons>
    </main>
  );
};

type ConfigButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

MyProfilePage.ConfigButton = ({onClick}: ConfigButtonProps) => (
  <button type="button" className="my-profile__config-button" onClick={onClick}>
    <FontAwesomeIcon icon={faCog} className="config-button__icon" />
  </button>
);

MyProfilePage.EditProfileButton = () => {
  const navigate = useNavigate();
  const onClick = useCallback(
    () => navigate(routes.users + routes.editProfile),
    [],
  );
  return <PopupWithButtons.Button text="프로필 수정" onClick={onClick} />;
};

MyProfilePage.ChangePasswordButton = () => {
  const navigate = useNavigate();
  const onClick = useCallback(
    () => navigate(routes.users + routes.changePasword),
    [],
  );

  return <PopupWithButtons.Button text="비밀번호 변경" onClick={onClick} />;
};

MyProfilePage.LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [executeLogoutQuery] = useLogoutQuery();
  const onClick = useCallback(async () => {
    if (!window.confirm('정말 로그아웃하시겠습니까?')) return;
    await executeLogoutQuery();
    dispatch(clearUser());
    toast.success('로그아웃되었습니다.');
    navigate(routes.home);
  }, []);
  return <PopupWithButtons.Button text="로그아웃" onClick={onClick} />;
};

export default WithPrivateValidation(MyProfilePage);
