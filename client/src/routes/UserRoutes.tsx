import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmptyPage from '../components/pages/EmptyPage/EmptyPage';
import ChangePasswordPage from '../components/pages/User/ChangePasswordPage/ChangePasswordPage';
import EditProfilePage from '../components/pages/User/EditProfilePage/EditProfilePage';
import MyProfilePage from '../components/pages/User/MyProfilePage/MyProfilePage';
import UserDetailPage from '../components/pages/User/UserDetailpage/UserDetailPage';
import routes from '../routes';

const UserRoutes = () => (
  <Routes>
    <Route path={routes.userDetail()} element={<UserDetailPage />} />
    <Route path={routes.myProfile} element={<MyProfilePage />} />
    <Route path={routes.editProfile} element={<EditProfilePage />} />
    <Route path={routes.changePasword} element={<ChangePasswordPage />} />
    <Route path="*" element={<EmptyPage />} />
  </Routes>
);

export default UserRoutes;
