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

export const deleteVideo = async (videoId: string) => {
  const route = apiRoutes.deleteVideo;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const toggleWatchLater = async (videoId: string) => {
  const route = apiRoutes.toggleWatchLater;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const toggleLikeVideo = async (videoId: string) => {
  const route = apiRoutes.toggleLikeVideo;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const toggleNotInterested = async (videoId: string) => {
  const route = apiRoutes.toggleNotInterested;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const deleteHistory = async (videoId: string) => {
  const route = apiRoutes.deleteHistory;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

const clearWatchLater = async () => {
  const route = apiRoutes.clearWatchLaters;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
  });
  return data;
};

const clearHistory = async () => {
  const route = apiRoutes.clearHistories;
  const {data} = await axios({
    url: route.url as string,
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

export const useToggleWatchLaterMutation = () => {
  return useMutation(toggleWatchLater, {
    mutationKey: 'toggleWatchLater',
  });
};

export const useToggleLikeVideoMutation = () => {
  return useMutation(toggleLikeVideo, {
    mutationKey: 'toggleLikeVideo',
  });
};

export const useToggleNotInterestedMutation = () => {
  return useMutation(toggleNotInterested, {
    mutationKey: 'toggleNotInterested',
  });
};

export const useDeleteHistoryMutation = () => {
  return useMutation(deleteHistory, {
    mutationKey: 'deleteHistory',
  });
};

export const useClearWatchLaterMutation = () => {
  return useMutation(clearWatchLater, {
    mutationKey: 'clearWatchLater',
  });
};

export const useClearHistoryMutation = () => {
  return useMutation(clearHistory, {
    mutationKey: 'clearHistory',
  });
};
