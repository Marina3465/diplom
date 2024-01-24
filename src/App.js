import './App.css';
import React, { useState, useEffect } from "react"

import { Routes, Route, Link } from 'react-router-dom';
import Choice from './components/admin/Choice';
import Admin_main from './components/admin/Admin_main';
import CreateQR from './components/admin/CreateQR';
import Log from './components/auth/Log'
import Admin_department from './components/admin/Admin_department';
import Admin_students from './components/admin/Admin_students';
import Admin_direction from './components/admin/Admin_direction';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false)
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {isAuthenticated ? <Route path='/' element={<Choice/>} /> : <Route path='/' element={<Log/>}/>}
        <Route path='Log' element={<Log/>}/>
        <Route path='Choice' element={<Choice />} />
        <Route path='AdminMain' element={<Admin_main />} />
        <Route path='CreateQR' element={<CreateQR />} />
        <Route path='AdminDepartment' element={<Admin_department />} />
        <Route path='AdminStud' element={<Admin_students/>} />
        <Route path='AdminDirection' element={<Admin_direction/>}/>
      </Routes>

    </div>
  );
}

export default App;

