import React from 'react';
import './CategoryPage.scss';
import {useCategoryPage} from './useCategoryPage';

const Videos = React.lazy(() => import('../../partial/Videos/Videos'));
const VideosFilterer = React.lazy(
  () => import('../../partial/VideosFilterer/VideosFilterer'),
);

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
