import React from 'react';
import './CategoryPage.scss';
import {useCategoryPage} from './useCategoryPage';

const VideosWithFilterer = React.lazy(
  () => import('../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const CategoryPage = () => {
  const {videosQuery} = useCategoryPage();
  return (
    <main className="category-page">
      <VideosWithFilterer videosQuery={videosQuery} />
    </main>
  );
};

export default CategoryPage;
