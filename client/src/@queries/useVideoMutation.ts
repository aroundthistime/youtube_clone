import axios from 'axios';
import {useMutation} from 'react-query';
import qs from 'qs';
import apiRoutes from '../apiRoutes';
import {getFormDataFromObject} from '../utils/fetchHandlers';

interface VideoMutationRequirements {
  title: string;
  description?: string;
  category?: string;
}

interface VideoEditRequirements extends VideoMutationRequirements {
  videoId: string;
}

interface VideoUploadRequirements extends VideoMutationRequirements {
  videoFile: File;
  thumbnailImage: File;
}

const uploadVideo = async (
  videoUploadRequirements: VideoUploadRequirements,
) => {
  const route = apiRoutes.uploadVideo;
  const formData = getFormDataFromObject(videoUploadRequirements);
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

const editVideo = async (videoEditRequirements: VideoEditRequirements) => {
  const route = apiRoutes.editVideo;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoEditRequirements.videoId),
    method: route.method,
    data: qs.stringify({
      title: videoEditRequirements.title,
      description: videoEditRequirements.description,
      category: videoEditRequirements.category,
    }),
  });
  return data;
};

const deleteVideo = async (videoId: string) => {
  const route = apiRoutes.deleteVideo;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const addVideoToNoIneterest = async (videoId: string) => {
  const route = apiRoutes.addNoInterest;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const addVideoToWatchLater = async (videoId: string) => {
  const route = apiRoutes.addWachLater;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const deleteVideoFromWatchLater = async (videoId: string) => {
  const route = apiRoutes.addWachLater;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

export const useUploadVideoMutation = () => {
  return useMutation(uploadVideo, {
    mutationKey: 'uploadVideo',
  });
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

export const useAddNoInterestMutation = () => {
  return useMutation(addVideoToNoIneterest, {
    mutationKey: 'addNoInterest',
  });
};

export const useAddWatchLaterMutation = () => {
  return useMutation(addVideoToWatchLater, {
    mutationKey: 'addWatchLater',
  });
};

export const useDeleteWatchLaterMutation = () => {
  return useMutation(deleteVideoFromWatchLater, {
    mutationKey: 'deleteWatchLater',
  });
};
