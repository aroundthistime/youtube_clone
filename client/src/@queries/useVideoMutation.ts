import axios from 'axios';
import {useMutation} from 'react-query';
import apiRoutes from '../apiRoutes';

const editVideo = async (videoId: string): Promise<boolean> => {
  const route = apiRoutes.editVideo;
  const urlFunction = route.url as Function;
  const {
    data: {result},
  } = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return result;
};

const deleteVideo = async (videoId: string): Promise<boolean> => {
  const route = apiRoutes.deleteVideo;
  const urlFunction = route.url as Function;
  const {
    data: {result},
  } = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return result;
};

export const useEditVideoMutation = () => {
  return useMutation(editVideo, {
    mutationKey: 'editVideo',
  });
};

export const useDeleteVideoMutation = () => {
  return useMutation(deleteVideo, {
    mutationKey: 'deleteVideo',
  });
};
