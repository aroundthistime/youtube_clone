/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useMutation} from 'react-query';
import qs from 'qs';
import {
  AuthMutationResponseType,
  JoinRequirementsType,
  LoginRequirementsType,
} from '../@types/AuthType';
import apiRoutes from '../apiRoutes';

const join = async (
  joinRequirements: JoinRequirementsType,
): Promise<AuthMutationResponseType> => {
  const route = apiRoutes.join;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: qs.stringify(joinRequirements),
  });
  return data;
};

const login = async (
  loginRequirements: LoginRequirementsType,
): Promise<AuthMutationResponseType> => {
  const route = apiRoutes.login;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: qs.stringify(loginRequirements),
  });
  return data;
};

export const useJoinMutation = () => {
  return useMutation(join, {
    mutationKey: 'join',
  });
};

export const useLoginMutation = () => {
  return useMutation(login, {
    mutationKey: 'login',
  });
};
