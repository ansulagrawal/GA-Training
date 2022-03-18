import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Student from './components/Student';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import axios from 'axios';

const App = () => {
  const [studentDetails, setStudentDetails] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='App'>
      <Router>
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route exact path='/' />
          <Route
            path='/login'
            element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <>
            <Route
              exact
              path='/student'
              element={
                <Student
                  userDetails={setStudentDetails}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route
              exact
              path='/student/:id'
              element={
                <Profile
                  userDetails={studentDetails}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
              }
            />
            <Route
              path='/*'
              element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
          </>
          )
        </Routes>
      </Router>
    </div>
  );
};

export default App;
