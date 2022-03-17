/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useMutation} from 'react-query';
import {JoinRequirementsType} from '../@types/AuthType';
import apiRoutes from '../apiRoutes';

const join = async (
  joinRequirements: JoinRequirementsType,
): Promise<boolean | undefined> => {
  const route = apiRoutes.join;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
    data: JSON.stringify(joinRequirements),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data?.result;
};

export const useJoinMutation = () => {
  return useMutation(join, {
    mutationKey: 'join',
  });
};
