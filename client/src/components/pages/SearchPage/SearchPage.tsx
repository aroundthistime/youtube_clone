import React from 'react';
import VideosFilterer from '../../partial/VideosFilterer/VideosFilterer';
import './SearchPage.scss';

const SearchPage = () => {
  return (
    <main className="search">
      <VideosFilterer />
    </main>
  );
};

export default SearchPage;
