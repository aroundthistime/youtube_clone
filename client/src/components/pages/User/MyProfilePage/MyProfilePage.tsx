import React from 'react';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PopupWithButtons from '../../../partial/PopupWithButtons/PopupWithButtons';
import './MyProfilePage.scss';
import {useMyProfilePage} from './useMyProfilePage';

const DetailUserProfile = React.lazy(
  () => import('../../../partial/DetailUserProfile/DetailUserProfile'),
);
const VideosWithFilterer = React.lazy(
  () => import('../../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const MyProfilePage = () => {
  const {user, popupRef, showButtonsPopup, popupButtons, queryParams} =
    useMyProfilePage();
  return (
    <main className="user-profile my-profile">
      <DetailUserProfile
        user={user}
        myProfileButton={
          <MyProfilePage.ConfigButton onClick={showButtonsPopup} />
        }
      />
      <VideosWithFilterer queryParams={queryParams} />
      <PopupWithButtons ref={popupRef} className="my-profile__config-popup">
        {popupButtons.map(popupButton => (
          <PopupWithButtons.Button {...popupButton} key={popupButton.text} />
        ))}
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

export default MyProfilePage;
