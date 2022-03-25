/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import {useQuery} from 'react-query';
import {DefaultInfiniteFetchSuccess} from '../@types/QueryParamsType';
import {FailedResponseData, SuccessResponseData} from '../@types/ResponseData';
import {VideoType} from '../@types/VideoType';
import apiRoutes from '../apiRoutes';

const getVideo = async (videoId: string) => {
  const route = apiRoutes.getVideo;
  const urlFunction = route.url as Function;
  const {data} = await axios({
    url: urlFunction(videoId),
    method: route.method,
  });
  return data;
};

export const useVideoQuery = (videoId: string) => {
  return useQuery(['video', videoId], () => getVideo(videoId));
};
