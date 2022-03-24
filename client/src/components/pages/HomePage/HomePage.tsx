import React from 'react';
import Videos from '../../partial/Videos/Videos';
import VideosFilterer from '../../partial/VideosFilterer/VideosFilterer';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  useHomePage();
  return (
    <main className="home">
      <VideosFilterer />
      <Videos queryParams={{sortMethod: undefined, uploadTime: undefined}} />
    </main>
  );
};

export default HomePage;
