/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useQuery} from 'react-query';
import apiRoutes from '../apiRoutes';

const getMyProfile = async () => {
  const route = apiRoutes.getMyProfile;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
  });
  return data;
};

export const useMyProfileQuery = () => {
  return useQuery('myProfile', getMyProfile);
};
