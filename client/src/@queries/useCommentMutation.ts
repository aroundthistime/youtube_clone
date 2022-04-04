import axios from 'axios';
import {useMutation} from 'react-query';
import qs from 'qs';
import apiRoutes from '../apiRoutes';

interface CommentAddRequirements {
  text: string;
  videoId: string;
}

interface CommentEditRequirements {
  text: string;
  id: string;
}

const addComment = async ({videoId, text}: CommentAddRequirements) => {
  const route = apiRoutes.addComment;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
    data: qs.stringify({
      text,
    }),
  });
  return data;
};

const editComment = async ({id, text}: CommentEditRequirements) => {
  const route = apiRoutes.editComment;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(id),
    method: route.method,
    data: qs.stringify({
      text,
    }),
  });
  return data;
};

const deleteComment = async (id: string) => {
  const route = apiRoutes.deleteComment;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(id),
    method: route.method,
  });
  return data;
};

const blockComment = async (id: string) => {
  const route = apiRoutes.blockComment;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(id),
    method: route.method,
  });
  return data;
};

export const useAddCommentMutation = () => {
  return useMutation(addComment, {
    mutationKey: 'addComment',
  });
};

export const useEditCommentMutation = () => {
  return useMutation(editComment, {
    mutationKey: 'editComment',
  });
};

export const useDeleteCommentMutation = () => {
  return useMutation(deleteComment, {
    mutationKey: 'deleteComment',
  });
};

export const useBlockCommentMutation = () => {
  return useMutation(blockComment, {
    mutationKey: 'blockComment',
  });
};
