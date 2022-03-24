import React from 'react';
import './SearchPage.scss';
import {useSearchPage} from './useSearchPage';

const VideosWithFilterer = React.lazy(
  () => import('../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const SearchPage = () => {
  const {queryParams} = useSearchPage();
  return (
    <main className="search">
      <VideosWithFilterer queryParams={queryParams} />
    </main>
  );
};

export default SearchPage;
