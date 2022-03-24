import React from 'react';
import Videos from '../../partial/Videos/Videos';
import VideosFilterer from '../../partial/VideosFilterer/VideosFilterer';
import './SearchPage.scss';
import {useSearchPage} from './useSearchPage';

const SearchPage = () => {
  const {queryParams} = useSearchPage();
  return (
    <main className="search">
      <VideosFilterer />
      <Videos queryParams={queryParams} />
    </main>
  );
};

export default SearchPage;
