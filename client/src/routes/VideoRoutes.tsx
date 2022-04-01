import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Loader from '../components/atom/Loader/Loader';
import RouteWithErrorBoundary from '../components/wrapper/RouteWithErrorBoundary/RouteWithErrorBoundary';
import routes from '../routes';

const VideoDetailPage = React.lazy(
  () => import('../components/pages/Video/VideoDetailPage/VideoDetailPage'),
);
const VideoUploadPage = React.lazy(
  () => import('../components/pages/Video/VideoUploadPage/VideoUploadPage'),
);
const VideoEditPage = React.lazy(
  () => import('../components/pages/Video/VideoEditPage/VideoEditPage'),
);
const EmptyPage = React.lazy(
  () => import('../components/pages/EmptyPage/EmptyPage'),
);

const VideoRoutes = () => (
  <Suspense fallback={<Loader className="full-screen" />}>
    <Routes>
      {RouteWithErrorBoundary({
        path: routes.videoDetail(),
        element: <VideoDetailPage />,
      })}
      {RouteWithErrorBoundary({
        path: routes.uploadVideo,
        element: <VideoUploadPage />,
      })}
      {RouteWithErrorBoundary({
        path: routes.editVideo(),
        element: <VideoEditPage />,
      })}
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  </Suspense>
);

export default VideoRoutes;
