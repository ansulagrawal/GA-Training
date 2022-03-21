import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>,
    div
  );
});
