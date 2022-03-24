import React from 'react';
import Videos from '../../partial/Videos/Videos';
import VideosFilterer from '../../partial/VideosFilterer/VideosFilterer';
import './CategoryPage.scss';
import {useCategoryPage} from './useCategoryPage';

const CategoryPage = () => {
  const {queryParams} = useCategoryPage();
  return (
    <main className="category-page">
      <VideosFilterer />
      <Videos queryParams={queryParams} />
    </main>
  );
};

export default CategoryPage;
