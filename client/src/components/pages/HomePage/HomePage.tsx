import React from 'react';
import Videos from '../../partial/Videos/Videos';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  const {videosQuery} = useHomePage();
  return (
    <main className="home">
      <Videos videosQuery={videosQuery} />
    </main>
  );
};

export default HomePage;
