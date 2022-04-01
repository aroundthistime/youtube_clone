import React from 'react';
import {
  useClearHistoryMutation,
  useDeleteHistoryMutation,
} from '../../../../@queries/useVideoMutation';
import {DefaultVideoProps} from '../../../partial/DefaultVideo/DefaultVideo';
import FeedClearButton from '../../../partial/FeedClearButton/FeedClearButton';
import FeedVideo from '../../../partial/FeedVideo/FeedVideo';
import Videos from '../../../partial/Videos/Videos';
import './HistoryPage.scss';
import {useHistoryPage} from './useHistoryPage';

const HistoryPage = () => {
  const {videosQuery} = useHistoryPage();
  return (
    <main className="history">
      <HistoryPage.Header />
      <Videos videosQuery={videosQuery} VideoComponent={HistoryPage.Video} />
    </main>
  );
};

HistoryPage.Header = () => (
  <Videos.Header>
    <Videos.Title>시청기록</Videos.Title>
    <Videos.HeaderRight>
      <FeedClearButton clearMutation={useClearHistoryMutation} />
    </Videos.HeaderRight>
  </Videos.Header>
);

HistoryPage.Video = (props: DefaultVideoProps) => (
  <FeedVideo mutation={useDeleteHistoryMutation} {...props} />
);

export default HistoryPage;
