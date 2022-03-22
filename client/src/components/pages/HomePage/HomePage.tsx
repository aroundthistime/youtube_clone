import React from 'react';
import Videos from '../../partial/Videos/Videos';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  const {videos, fetchNextPage} = useHomePage();
  return (
    <main className="home">
      {videos.length > 0 ? (
        <Videos className="home__videos" videos={videos} />
      ) : (
        <div>하잉</div>
      )}
      기본화면
      <button type="button" onClick={() => fetchNextPage()}>
        하이용
      </button>
    </main>
  );
};

export default HomePage;
