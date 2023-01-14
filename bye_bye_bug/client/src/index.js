import React from 'react';
import ReactDOM from 'react-dom/client';
import {   BrowserRouter as Router,
    Routes, Route, Outlet, NavLink } from 'react-router-dom';
import './index.css';
import Login from './components/login';
import Register from './components/registerForm';
import CreateProject from './components/createProject';

console.log('index.js');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/"  element={<Login />}/>
            <Route path="/register"  element={<Register />}/>
            <Route path='/createProject' element={<CreateProject/>}/>
        </Routes>
    </Router>
);
