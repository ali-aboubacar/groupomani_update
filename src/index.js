import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { BrowserRouter } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
  <Home/>
  </BrowserRouter>
);
