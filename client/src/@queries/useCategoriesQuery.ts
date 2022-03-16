import axios from 'axios';
import {useQuery} from 'react-query';
import {NavTabContentType} from '../@types/NavTabType';
import {DefaultResponseData} from '../@types/ResponseData';

export interface CategoriesResponseData extends DefaultResponseData {
  categories: NavTabContentType[];
}

const getCategories = async (): Promise<CategoriesResponseData> => {
  const {data} = await axios.get('/category');
  return data;
};

export const useCategoriesQuery = () => {
  return useQuery('categories', getCategories, {suspense: true});
};