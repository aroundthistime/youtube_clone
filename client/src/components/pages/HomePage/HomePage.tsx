import React from 'react';
import Video from '../../partial/Video/Video';
import './HomePage.scss';
import {useHomePage} from './useHomePage';

const HomePage = () => {
  const {videos, fetchNextPage} = useHomePage();
  return (
    <main className="home">
      {videos.length > 0 ? (
        <div className="videos">
          {videos.map(video => (
            <Video video={video} key={video._id} />
          ))}
        </div>
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
