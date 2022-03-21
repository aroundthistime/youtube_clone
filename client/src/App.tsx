import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {usePopup} from './@hooks/usePopup';

import './App.scss';
import BlurBackground from './components/atom/BlurBackground/BlurBackground';
import CategoryPage from './components/pages/CategoryPage/CategoryPage';
import EmptyPage from './components/pages/EmptyPage/EmptyPage';
import HomePage from './components/pages/HomePage/HomePage';
import JoinPage from './components/pages/JoinPage/JoinPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import SearchPage from './components/pages/SearchPage/SearchPage';
import ErrorMessage from './components/partial/ErrorMessage/ErrorMessage';
import Header from './components/partial/Header/Header';
import Loader from './components/partial/Loader/Loader';
import Nav from './components/partial/Nav/Nav';
import ErrorBoundary from './components/wrapper/ErrorBoundary/ErrorBoundary';
import routes from './routes';
import FeedRoutes from './routes/FeedRoutes';
import UserRoutes from './routes/UserRoutes';
import VideoRoutes from './routes/VideoRoutes';

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
            <ErrorBoundary
              fallback={<ErrorMessage className="error-message--fullscreen" />}>
              <Routes>
                <Route path={routes.home} element={<HomePage />} />
                <Route path={routes.join} element={<JoinPage />} />
                <Route path={routes.login} element={<LoginPage />} />
                <Route path={routes.search} element={<SearchPage />} />
                <Route path={routes.category()} element={<CategoryPage />} />
                <Route path={`${routes.feed}/*`} element={<FeedRoutes />} />
                <Route path={`${routes.users}/*`} element={<UserRoutes />} />
                <Route path={`${routes.videos}/*`} element={<VideoRoutes />} />
                <Route path="*" element={<EmptyPage />} />
              </Routes>
            </ErrorBoundary>
            <BlurBackground />
          </Router>
        </div>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
