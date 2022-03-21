import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Student from './Student';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <Routes>
        <Route exact path='/student' element={<Student />} />
      </Routes>
    </Router>,
    div
  );
});
