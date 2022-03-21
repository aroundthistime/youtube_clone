/* eslint-disable import/prefer-default-export */
import {useLocation} from 'react-router-dom';
import {useCategoriesQuery} from '../../../@queries/useCategoriesQuery';
import {NavTabType} from '../../../@types/NavTabType';

type ReturnType = {
  categories: NavTabType[] | undefined;
};

export const useCategories = (): ReturnType => {
  const {data} = useCategoriesQuery();
  const location = useLocation();
  const currrentCategory = location.pathname
    .split('/')[2]
    ?.replaceAll('%20', ' ');
  const categories = data?.categories.map(category => {
    return {
      ...category,
      isSelected: category.name === currrentCategory,
    };
  });
  return {
    categories,
  };
};
