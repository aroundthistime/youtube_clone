/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import qs from 'qs';
import {useMutation} from 'react-query';
import {UserType} from '../@types/UserType';
import apiRoutes from '../apiRoutes';
import {getFormDataFromObject} from '../utils/fetchHandlers';

interface EditProfileRequirements extends Pick<UserType, 'name' | 'status'> {
  avatar?: File;
}

const editProfile = async (
  editProfileRequirements: EditProfileRequirements,
) => {
  const route = apiRoutes.editProfile;
  const formData = getFormDataFromObject(editProfileRequirements);
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

type ChangePasswordRequirements = {
  oldPassword: string;
  newPassword: string;
};

const changePassword = async (
  changePasswordRequirements: ChangePasswordRequirements,
) => {
  const route = apiRoutes.changePassword;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: qs.stringify(changePasswordRequirements),
  });
  return data;
};

export const useEditProfileMutation = () => {
  return useMutation(editProfile, {
    mutationKey: 'editProfile',
  });
};

export const useChanagePasswordMutation = () => {
  return useMutation(changePassword, {
    mutationKey: 'changePassword',
  });
};
