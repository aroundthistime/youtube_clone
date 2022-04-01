import React from 'react';
import {useDeleteHistoryMutation} from '../../../../@queries/useVideoMutation';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import './HistoryPage.scss';
import {useHistoryPage} from './useHistoryPage';

const Videos = React.lazy(() => import('../../../partial/Videos/Videos'));

const HistoryPage = () => {
  const {videosQuery} = useHistoryPage();
  return (
    <main className="history">
      <Videos videosQuery={videosQuery} VideoComponent={HistoryPage.Video} />
    </main>
  );
};

HistoryPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useDeleteHistoryMutation} {...props} />
);

export default HistoryPage;
