import React from 'react';
import Videos from '../../partial/Videos/Videos';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  useHomePage();
  return (
    <main className="home">
      <Videos queryParams={{sortMethod: undefined, uploadTime: undefined}} />
    </main>
  );
};

export default HomePage;
