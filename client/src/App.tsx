import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

import './App.scss';
import Header from './components/partial/Header/Header';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />

        <Routes />
      </Router>
    </div>
  );
}

export default App;
