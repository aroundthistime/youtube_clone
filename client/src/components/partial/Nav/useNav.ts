/* eslint-disable import/prefer-default-export */
import {useCategoriesQuery} from '../../../@queries/useCategoriesQuery';
import {NavTabType} from '../../../@types/NavTabType';

type ReturnType = {
  categories: NavTabType[] | undefined;
};

export const useNav = (): ReturnType => {
  const {data} = useCategoriesQuery();
  //   const user =
  //   const defaultCategories: CategoryType[] = [
  //     {
  //       name: 'Home',
  //       iconClassName: 'fa-solid fa-house-chimney',
  //     },
  //   ];
  return {
    categories: data?.categories,
  };
};
