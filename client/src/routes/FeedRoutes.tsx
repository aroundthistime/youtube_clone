import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Loader from '../components/atom/Loader/Loader';
import RouteWithErrorBoundary from '../components/wrapper/RouteWithErrorBoundary/RouteWithErrorBoundary';
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
  <Suspense fallback={<Loader />}>
    <Routes>
      {RouteWithErrorBoundary({
        path: routes.history,
        element: <HistoryPage />,
      })}
      {RouteWithErrorBoundary({
        path: routes.watchLater,
        element: <WatchLaterPage />,
      })}
      {RouteWithErrorBoundary({
        path: routes.likedVideos,
        element: <LikedVideosPage />,
      })}
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  </Suspense>
);

export default FeedRoutes;
