import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainErrorBoundary} from '../App';
import Loader from '../components/atom/Loader/Loader';
import routes from '../routes';

const UserProfilePage = React.lazy(
  () => import('../components/pages/User/UserProfilepage/UserProfilePage'),
);
const MyProfilePage = React.lazy(
  () => import('../components/pages/User/MyProfilePage/MyProfilePage'),
);
const EditProfilePage = React.lazy(
  () => import('../components/pages/User/EditProfilePage/EditProfilePage'),
);
const ChangePasswordPage = React.lazy(
  () =>
    import('../components/pages/User/ChangePasswordPage/ChangePasswordPage'),
);
const EmptyPage = React.lazy(
  () => import('../components/pages/EmptyPage/EmptyPage'),
);

const UserRoutes = () => (
  <MainErrorBoundary>
    <Suspense fallback={<Loader className="full-screen" />}>
      <Routes>
        <Route path={routes.userDetail()} element={<UserProfilePage />} />
        <Route path={routes.myProfile} element={<MyProfilePage />} />
        <Route path={routes.editProfile} element={<EditProfilePage />} />
        <Route path={routes.changePasword} element={<ChangePasswordPage />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </Suspense>
  </MainErrorBoundary>
);

export default UserRoutes;
