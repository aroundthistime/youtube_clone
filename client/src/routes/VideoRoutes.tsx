import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmptyPage from '../components/pages/EmptyPage/EmptyPage';
import VideoDetailPage from '../components/pages/Video/VideoDetailPage/VideoDetailPage';
import VideoEditPage from '../components/pages/Video/VideoEditPage/VideoEditPage';
import VideoUploadPage from '../components/pages/Video/VideoUploadPage/VideoUploadPage';
import routes from '../routes';

const VideoRoutes = () => (
  <Routes>
    <Route path={routes.videoDetail()} element={<VideoDetailPage />} />
    <Route path={routes.uploadVideo} element={<VideoUploadPage />} />
    <Route path={routes.editVideo()} element={<VideoEditPage />} />
    <Route path="*" element={<EmptyPage />} />
  </Routes>
);

export default VideoRoutes;
