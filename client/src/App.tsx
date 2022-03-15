import React, {Suspense} from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

import './App.scss';
import Header from './components/partial/Header/Header';
import Loader from './components/partial/Loader/Loader';
import Nav from './components/partial/Nav/Nav';
import ErrorBoundary from './components/wrapper/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <ErrorBoundary fallback={<span>안됑</span>}>
            <Nav />
          </ErrorBoundary>
        </Suspense>
        <main />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
