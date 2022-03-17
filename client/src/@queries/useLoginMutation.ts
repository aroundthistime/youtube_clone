/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useMutation} from 'react-query';
import {LoginRequirementsType} from '../@types/AuthType';
import apiRoutes from '../apiRoutes';

const login = async (
  loginRequirements: LoginRequirementsType,
): Promise<boolean | undefined> => {
  const route = apiRoutes.login;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: JSON.stringify(loginRequirements),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data?.result;
};

export const useLoginMutation = () => {
  return useMutation(login, {
    mutationKey: 'login',
  });
};
