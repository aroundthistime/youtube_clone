import React from 'react';
import './CategoryPage.scss';
import {useCategoryPage} from './useCategoryPage';

const VideosWithFilterer = React.lazy(
  () => import('../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const CategoryPage = () => {
  const {queryParams} = useCategoryPage();
  return (
    <main className="category-page">
      <VideosWithFilterer queryParams={queryParams} />
    </main>
  );
};

export default CategoryPage;
