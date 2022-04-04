/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import qs from 'qs';
import {useMutation} from 'react-query';
import {UserType} from '../@types/UserType';
import apiRoutes from '../apiRoutes';

// type EditProfileRequirements = Pick<UserType, 'name' | 'status'

// const editProfile = (
//     editProfileRequirements :
// )

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

export const useChanagePasswordMutation = () => {
  return useMutation(changePassword, {
    mutationKey: 'changePassword',
  });
};
