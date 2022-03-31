import React, {PropsWithChildren, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {usePopup} from './@hooks/usePopup';
import './App.scss';
import ErrorMessage from './components/partial/ErrorMessage/ErrorMessage';
import Loader from './components/atom/Loader/Loader';
import ErrorBoundary from './components/wrapper/ErrorBoundary/ErrorBoundary';
import routes from './routes';
import VideoUploadPage from './components/pages/Video/VideoUploadPage/VideoUploadPage';
import FeedRoutes from './routes/FeedRoutes';
import UserRoutes from './routes/UserRoutes';
import VideoRoutes from './routes/VideoRoutes';

const Header = React.lazy(() => import('./components/partial/Header/Header'));
const Nav = React.lazy(() => import('./components/partial/Nav/Nav'));
const HomePage = React.lazy(
  () => import('./components/pages/HomePage/HomePage'),
);
const JoinPage = React.lazy(
  () => import('./components/pages/JoinPage/JoinPage'),
);
const LoginPage = React.lazy(
  () => import('./components/pages/LoginPage/LoginPage'),
);
const SearchPage = React.lazy(
  () => import('./components/pages/SearchPage/SearchPage'),
);
const CategoryPage = React.lazy(
  () => import('./components/pages/CategoryPage/CategoryPage'),
);
const EmptyPage = React.lazy(
  () => import('./components/pages/EmptyPage/EmptyPage'),
);
const BlurBackground = React.lazy(
  () => import('./components/atom/BlurBackground/BlurBackground'),
);

export const MainErrorBoundary = ({children}: PropsWithChildren<{}>) => (
  <ErrorBoundary
    fallback={<ErrorMessage className="error-message--fullscreen" />}>
    {children}
  </ErrorBoundary>
);

function App() {
  const {ref: navRef, showByButtonClick: showMobileNav} =
    usePopup<HTMLElement>();
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallback={<ErrorMessage />}>
        <div className="app">
          <Router>
            <Header showMobileNav={showMobileNav} />
            <Nav ref={navRef} />
            <Routes>
              <Route
                path={routes.home}
                element={
                  <MainErrorBoundary>
                    <HomePage />
                  </MainErrorBoundary>
                }
              />
              <Route
                path={routes.join}
                element={
                  <MainErrorBoundary>
                    <JoinPage />
                  </MainErrorBoundary>
                }
              />
              <Route
                path={routes.login}
                element={
                  <MainErrorBoundary>
                    <LoginPage />
                  </MainErrorBoundary>
                }
              />
              <Route
                path={routes.search}
                element={
                  <MainErrorBoundary>
                    <SearchPage />
                  </MainErrorBoundary>
                }
              />
              <Route
                path={routes.category()}
                element={
                  <MainErrorBoundary>
                    <CategoryPage />
                  </MainErrorBoundary>
                }
              />
              <Route
                path={routes.uploadVideo}
                element={
                  <MainErrorBoundary>
                    <VideoUploadPage />
                  </MainErrorBoundary>
                }
              />
              <Route path={`${routes.feed}/*`} element={<FeedRoutes />} />
              <Route path={`${routes.users}/*`} element={<UserRoutes />} />
              <Route path={`${routes.videos}/*`} element={<VideoRoutes />} />
              <Route path="*" element={<EmptyPage />} />
            </Routes>
            <BlurBackground />
          </Router>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
