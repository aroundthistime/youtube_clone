import axios from 'axios';
import {useQuery} from 'react-query';
import {NavTabContentType} from '../@types/NavTabType';
import {DefaultResponseData} from '../@types/ResponseData';
import apiRoutes from '../apiRoutes';

export interface CategoriesResponseData extends DefaultResponseData {
  categories: NavTabContentType[];
}

const getCategories = async (): Promise<CategoriesResponseData> => {
  const route = apiRoutes.getCategories;
  const {data} = await axios({
    url: route.url as string,
    method: route.method,
  });
  return data;
};

export const useCategoriesQuery = () => {
  return useQuery('categories', getCategories, {suspense: true});
};
