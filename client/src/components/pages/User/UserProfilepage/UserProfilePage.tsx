import React from 'react';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import './UserProfilePage.scss';
import {useUserProfilePage} from './useUserProfilePage';

const UserDetailPage = () => {
  const {user} = useUserProfilePage();
  return (
    <main className="user-profile">
      <DetailUserProfile user={user} />
    </main>
  );
};

export default UserDetailPage;
