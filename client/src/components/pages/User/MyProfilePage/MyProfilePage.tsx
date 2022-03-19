import React from 'react';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import './MyProfilePage.scss';
import {useMyProfilePage} from './useMyProfilePage';

const MyProfilePage = () => {
  const {user} = useMyProfilePage();
  return (
    <main className="user-profile">
      <DetailUserProfile user={user} myProfileButton={<div>1</div>} />
    </main>
  );
};

export default MyProfilePage;
