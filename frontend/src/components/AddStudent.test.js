import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudent from './AddStudent';
import Student from './Student';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AddStudent />, div);
});
