import {faCog} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import PopupWithButtons from '../../../partial/PopupWithButtons/PopupWithButtons';
import './MyProfilePage.scss';
import {useMyProfilePage} from './useMyProfilePage';

const MyProfilePage = () => {
  const {user, popupRef, showPopup} = useMyProfilePage();
  return (
    <main className="user-profile my-profile">
      <DetailUserProfile
        user={user}
        myProfileButton={<MyProfilePage.ConfigButton showPopup={showPopup} />}
      />
      <PopupWithButtons
        buttons={[
          {
            text: '1',
            onClick: event => 1,
          },
        ]}
        // className="popup--visible"
        ref={popupRef}
      />
      {/* <MyProfilePage.ActionsPopup /> */}
    </main>
  );
};

type ConfigButtonProps = {
  showPopup: Function;
};

MyProfilePage.ConfigButton = ({showPopup}: ConfigButtonProps) => {
  const onClick = () => {
    console.log(showPopup);
    showPopup();
  };
  return (
    <button
      type="button"
      className="my-profile__config-button"
      onClick={onClick}>
      <FontAwesomeIcon icon={faCog} className="config-button__icon" />
    </button>
  );
};

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
