import './style.css';
import Sidebar from '../../components/Sidebar'
import Displaypost from '../../components/Displaypost'
import Displayonepost from '../../components/Displayonepost';
import Login from '../Login'
import Signup from '../Signup'
import Create from '../Create'
import Profile from '../Profile'
import React, {useState,useEffect} from 'react'
// import { userService } from '../../Services/userService';
import { storageService } from '../../Services/storageService';
import { Routes,Route} from "react-router-dom";


function Home() {
  const [userDetails, setUserDetails] = useState({
    userId:null,
    isAdmin:null,
  });

  useEffect(()=>{
    const id = storageService.get("userId");
    const token = storageService.get("token")
    const isAdmin = storageService.get("isAdmin")
      setUserDetails({
        userId:id,
        token:token,
        isAdmin:isAdmin,
      });
  },[]);
  return (
    <section className="home-section">
      <Sidebar/>
      <Routes>
        <Route exact path="/" element={ <Displaypost/> } />
        <Route path="/post/:id" element={ <Displayonepost props={userDetails} /> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup props={userDetails}/> } />
        <Route path="/create" element={ <Create/> } />
        <Route path="/profile" element={ <Profile props={userDetails}/> } />
      </Routes>
    </section>
  );
}

export default Home;
