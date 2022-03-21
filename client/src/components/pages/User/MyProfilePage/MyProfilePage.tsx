import {faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import PopupWithButtons from '../../../partial/PopupWithButtons/PopupWithButtons';
import './MyProfilePage.scss';
import {useMyProfilePage} from './useMyProfilePage';

const MyProfilePage = () => {
  const {user, popupRef, showButtonsPopup, popupButtons} = useMyProfilePage();
  return (
    <main className="user-profile my-profile">
      <DetailUserProfile
        user={user}
        myProfileButton={
          <MyProfilePage.ConfigButton onClick={showButtonsPopup} />
        }
      />
      <PopupWithButtons ref={popupRef} className="my-profile__config-popup">
        {popupButtons.map(popupButton => (
          <PopupWithButtons.Button {...popupButton} key={popupButton.text} />
        ))}
      </PopupWithButtons>

      {/* <MyProfilePage.ActionsPopup /> */}
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

// MyProfilePage.ActionsPopup = () => {
//   return (
//     <div className="my-profile__actions-popup popup popup--visible">
//       <MyProfilePage.ActionButton />
//       <MyProfilePage.ActionButton />

//       <MyProfilePage.ActionButton />

//       <MyProfilePage.ActionButton />

//       <MyProfilePage.ActionButton />
//     </div>
//   );
// };

// MyProfilePage.ActionButton = () => {
//   return <button type="button">버튼</button>;
// };

export default MyProfilePage;
