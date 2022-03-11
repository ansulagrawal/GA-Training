import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Student from './components/Student';

const App = () => {
   return (
      <div className='App'>
         <Router>
            <Routes>
               <Route path='/' element={<Login />} />
               <Route exact path='/student' element={<Student />} />
            </Routes>
         </Router>
      </div>
   );
};

export default App;
