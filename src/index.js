import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Create from './pages/Create';
import { BrowserRouter,Routes,Route} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Navbar/>
        <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/create" element={ <Create/> } />
        <Route path="/profile" element={ <Profile/> } />
      </Routes>
  <Footer/>
  </BrowserRouter>
);
