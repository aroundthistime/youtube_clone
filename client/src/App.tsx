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
import RouteWithErrorBoundary from './components/wrapper/RouteWithErrorBoundary/RouteWithErrorBoundary';

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
              {RouteWithErrorBoundary({
                path: routes.home,
                element: <HomePage />,
              })}
              {RouteWithErrorBoundary({
                path: routes.join,
                element: <JoinPage />,
              })}
              {RouteWithErrorBoundary({
                path: routes.login,
                element: <LoginPage />,
              })}
              {RouteWithErrorBoundary({
                path: routes.search,
                element: <SearchPage />,
              })}
              {RouteWithErrorBoundary({
                path: routes.search,
                element: <SearchPage />,
              })}
              {RouteWithErrorBoundary({
                path: routes.category(),
                element: <CategoryPage />,
              })}

              {RouteWithErrorBoundary({
                path: routes.uploadVideo,
                element: <VideoUploadPage />,
              })}
              {RouteWithErrorBoundary({
                path: `${routes.feed}/*`,
                element: <FeedRoutes />,
              })}
              {RouteWithErrorBoundary({
                path: `${routes.users}/*`,
                element: <UserRoutes />,
              })}
              {RouteWithErrorBoundary({
                path: `${routes.videos}/*`,
                element: <VideoRoutes />,
              })}
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
