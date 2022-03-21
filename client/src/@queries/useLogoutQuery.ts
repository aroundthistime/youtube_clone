/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import apiRoutes from '../apiRoutes';
import {useLazyQuery} from './useLazyQuery';

const requestLogout = async () => {
  const route = apiRoutes.logout;
  await axios({
    url: route.url as string,
    method: route.method,
  });
};

export const useLogoutQuery = () => {
  return useLazyQuery('logout', requestLogout);
};
