import React from 'react';
import ErrorBoundary from '../../../wrapper/ErrorBoundary/ErrorBoundary';
import './UserProfilePage.scss';
import {useUserProfilePage} from './useUserProfilePage';

const DetailUserProfile = React.lazy(
  () => import('../../../partial/DetailUserProfile/DetailUserProfile'),
);
const VideosWithFilterer = React.lazy(
  () => import('../../../partial/VideosWithFilterer/VideosWithFilterer'),
);
const EmptyContent = React.lazy(
  () => import('../../../atom/EmptyContent/EmptyContent'),
);

const UserDetailPage = () => {
  const {user, videosQuery} = useUserProfilePage();
  return (
    <main className="user-profile">
      <DetailUserProfile user={user} />
      {videosQuery && <VideosWithFilterer videosQuery={videosQuery} />}
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
