import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' />
      </Routes>
    </Router>,
    div
  );
});
