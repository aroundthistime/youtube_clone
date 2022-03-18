import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.scss';
import EmptyPage from './components/pages/EmptyPage/EmptyPage';
import HomePage from './components/pages/HomePage/HomePage';
import JoinPage from './components/pages/JoinPage/JoinPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import SearchPage from './components/pages/SearchPage/SearchPage';
import Header from './components/partial/Header/Header';
import Loader from './components/partial/Loader/Loader';
import Nav from './components/partial/Nav/Nav';
import routes from './routes';
import FeedRoutes from './routes/FeedRoutes';
import UserRoutes from './routes/UserRoutes';
import VideoRoutes from './routes/VideoRoutes';

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="app">
        <Router>
          <Header />
          <Nav />
          <Routes>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.join} element={<JoinPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.search} element={<SearchPage />} />
            <Route path={`${routes.feed}/*`} element={<FeedRoutes />} />
            <Route path={`${routes.users}/*`} element={<UserRoutes />} />
            <Route path={`${routes.videos}/*`} element={<VideoRoutes />} />
            <Route path="*" element={<EmptyPage />} />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
