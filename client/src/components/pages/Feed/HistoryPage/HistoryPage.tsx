import React from 'react';
import './HistoryPage.scss';
import {useHistoryPage} from './useHistoryPage';

const Videos = React.lazy(() => import('../../../partial/Videos/Videos'));

const HistoryPage = () => {
  const {videosQuery} = useHistoryPage();
  return (
    <main className="history">
      <Videos videosQuery={videosQuery} />
    </main>
  );
};

export default HistoryPage;
