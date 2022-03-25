import React from 'react';
import './SearchPage.scss';
import {useSearchPage} from './useSearchPage';

const VideosWithFilterer = React.lazy(
  () => import('../../partial/VideosWithFilterer/VideosWithFilterer'),
);

const SearchPage = () => {
  const {videosQuery} = useSearchPage();
  return (
    <main className="search">
      <VideosWithFilterer videosQuery={videosQuery} />
    </main>
  );
};

export default SearchPage;
