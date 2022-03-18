import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmptyPage from '../components/pages/EmptyPage/EmptyPage';
import HistoryPage from '../components/pages/Feed/HistoryPage/HistoryPage';
import LikedVideosPage from '../components/pages/Feed/LikedVideosPage/LikedVideosPage';
import WatchLaterPage from '../components/pages/Feed/WatchLaterPage/WatchLaterPage';
import routes from '../routes';

const FeedRoutes = () => (
  <Routes>
    <Route path={routes.history} element={<HistoryPage />} />
    <Route path={routes.watchLater} element={<WatchLaterPage />} />
    <Route path={routes.likedVideos} element={<LikedVideosPage />} />
    <Route path="*" element={<EmptyPage />} />
  </Routes>
);

export default FeedRoutes;
