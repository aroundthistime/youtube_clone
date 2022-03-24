import React from 'react';
import EmptyContent from '../../../atom/EmptyContent/EmptyContent';
import DetailUserProfile from '../../../partial/DetailUserProfile/DetailUserProfile';
import Videos from '../../../partial/Videos/Videos';
import VideosFilterer from '../../../partial/VideosFilterer/VideosFilterer';
import ErrorBoundary from '../../../wrapper/ErrorBoundary/ErrorBoundary';
import './UserProfilePage.scss';
import {useUserProfilePage} from './useUserProfilePage';

const UserDetailPage = () => {
  const {user, queryParams} = useUserProfilePage();
  return (
    <main className="user-profile">
      <DetailUserProfile user={user} />
      <VideosFilterer />
      <Videos queryParams={queryParams} />
    </main>
  );
};

const NoUser = () => (
  <main className="main--empty">
    <EmptyContent message="유저 정보를 찾을 수 없습니다" />
  </main>
);

export default React.memo(() => (
  <ErrorBoundary fallback={<NoUser />}>
    <UserDetailPage />
  </ErrorBoundary>
));
