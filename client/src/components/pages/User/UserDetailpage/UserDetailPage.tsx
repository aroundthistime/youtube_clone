import React from 'react';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import './UserDetailPage.scss';
import {useUserDetailPage} from './useUserDetailPage';

const UserDetailPage = () => {
  const {user} = useUserDetailPage();
  return (
    <main className="user-profile">
      <DetailUserProfile user={user} />
    </main>
  );
};

export default UserDetailPage;
