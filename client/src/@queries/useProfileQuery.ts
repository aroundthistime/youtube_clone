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

const getUserProfile = async (userId: string) => {
  const route = apiRoutes.getUserProfile;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(userId),
    method: route.method,
  });
  return data;
};

export const useMyProfileQuery = () => {
  return useQuery('myProfile', getMyProfile);
};

export const useUserProfileQuery = (userId: string) => {
  return useQuery(['userProfile', userId], () => getUserProfile(userId));
};
