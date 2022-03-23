import React from 'react';
import FetchMoreIndicator from '../../partial/FetchMoreIndicator/FetchMoreIndicator';
import Videos from '../../partial/Videos/Videos';
import VideosFilterer from '../../partial/VideosFilterer/VideosFilterer';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  // const {videos, isFetchingNextPage} = useHomePage();
  return (
    <main className="home">
      <Videos queryParams={{sortMethod: undefined, uploadTime: undefined}} />
    </main>
  );
};

export default HomePage;
