import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Home from './pages/Home';
import Logo from './components/Logo';
import { BrowserRouter } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Logo/>
  <Home/>
  </BrowserRouter>
);
