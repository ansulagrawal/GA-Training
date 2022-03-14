import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Student from './components/Student';
import Profile from './components/Profile';

const App = () => {
  const [studentDetails, setStudentDetails] = useState('');
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            exact
            path='/student'
            element={<Student userDetails={setStudentDetails} />}
          />
          <Route
            exact
            path='/student/profile'
            element={<Profile userDetails={studentDetails} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
