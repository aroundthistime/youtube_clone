import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

import './App.scss';
import Header from './components/partial/Header/Header';
import Nav from './components/partial/Nav/Nav';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Nav />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
