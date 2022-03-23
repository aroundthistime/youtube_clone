import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainErrorBoundary} from '../App';
import Loader from '../components/atom/Loader/Loader';
import routes from '../routes';

const HistoryPage = React.lazy(
  () => import('../components/pages/Feed/HistoryPage/HistoryPage'),
);
const WatchLaterPage = React.lazy(
  () => import('../components/pages/Feed/WatchLaterPage/WatchLaterPage'),
);
const LikedVideosPage = React.lazy(
  () => import('../components/pages/Feed/LikedVideosPage/LikedVideosPage'),
);
const EmptyPage = React.lazy(
  () => import('../components/pages/EmptyPage/EmptyPage'),
);

const FeedRoutes = () => (
  <MainErrorBoundary>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={routes.history} element={<HistoryPage />} />
        <Route path={routes.watchLater} element={<WatchLaterPage />} />
        <Route path={routes.likedVideos} element={<LikedVideosPage />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </Suspense>
  </MainErrorBoundary>
);

export default FeedRoutes;
