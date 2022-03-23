import React from 'react';
import FetchMoreIndicator from '../../partial/FetchMoreIndicator/FetchMoreIndicator';
import Videos from '../../partial/Videos/Videos';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  const {videos, isFetchingNextPage} = useHomePage();
  return (
    <main className="home">
      {videos.length > 0 ? (
        <Videos className="home__videos" videos={videos} />
      ) : (
        <div>하잉</div>
      )}
      {isFetchingNextPage && <FetchMoreIndicator />}
    </main>
  );
};

export default HomePage;
