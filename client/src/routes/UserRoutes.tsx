import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainErrorBoundary} from '../App';
import Loader from '../components/atom/Loader/Loader';
import RouteWithErrorBoundary from '../components/wrapper/RouteWithErrorBoundary/RouteWithErrorBoundary';
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
  <Routes>
    {RouteWithErrorBoundary({
      path: routes.userDetail(),
      element: <UserProfilePage />,
    })}
    {RouteWithErrorBoundary({
      path: routes.myProfile,
      element: <MyProfilePage />,
    })}
    {RouteWithErrorBoundary({
      path: routes.editProfile,
      element: <EditProfilePage />,
    })}
    {RouteWithErrorBoundary({
      path: routes.changePasword,
      element: <ChangePasswordPage />,
    })}
    <Route path="*" element={<EmptyPage />} />
  </Routes>
);

export default UserRoutes;
