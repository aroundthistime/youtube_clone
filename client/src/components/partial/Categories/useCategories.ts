/* eslint-disable import/prefer-default-export */
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {setCategories} from '../../../@modules/categoriesSlice';
import {useCategoriesQuery} from '../../../@queries/useCategoriesQuery';
import {NavTabType} from '../../../@types/NavTabType';
import {getCurrentCategoryFromPathname} from '../../../utils/urlHandler';

type ReturnType = {
  categories: NavTabType[] | undefined;
};

export const useCategories = (): ReturnType => {
  const {data} = useCategoriesQuery();
  const location = useLocation();
  const dispatch = useDispatch();

  const currrentCategory = useMemo(() => {
    return getCurrentCategoryFromPathname(location.pathname);
  }, [location.pathname]);
  const categoryTabs = data?.categories.map(category => {
    return {
      ...category,
      isSelected: category.name === currrentCategory,
    };
  });

  useEffect(() => {
    if (data?.categories) {
      const categoryNames = data.categories.map(category => category.name);
      dispatch(setCategories(categoryNames));
    }
  }, [data?.categories]);

  return {
    categories: categoryTabs,
  };
};
