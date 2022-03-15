/* eslint-disable import/prefer-default-export */
import {useUrlQuery} from '../../../@hooks/useUrlQuery';
import {useCategoriesQuery} from '../../../@queries/useCategoriesQuery';
import {NavTabType} from '../../../@types/NavTabType';

type ReturnType = {
  categories: NavTabType[] | undefined;
};

export const useCategories = (): ReturnType => {
  const {data} = useCategoriesQuery();
  const urlQuery = useUrlQuery();
  const currrentCategory = urlQuery.get('category');
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
