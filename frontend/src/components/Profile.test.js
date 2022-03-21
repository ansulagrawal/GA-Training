import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Routes>
        <Route exact path='/student/:id' element={<Profile />} />
      </Routes>
    </Router>,
    div
  );
});
