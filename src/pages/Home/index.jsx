import './style.css';
import Displaypost from '../../components/Displaypost'
import Displayonepost from '../../components/Displayonepost';
import Login from '../Login'
import Signup from '../Signup'
import Create from '../Create'
import Error from '../Error'
import React, {useState,useEffect} from 'react'
// import { userService } from '../../Services/userService';
import { storageService } from '../../Services/storageService';
import { Routes,Route} from "react-router-dom";


function Home() {
  const [userDetails, setUserDetails] = useState({});
  

  useEffect(()=>{
    const id = storageService.get("userId");
    const token = storageService.get("token")
    const isAdmin = storageService.get("isAdmin")
    const loggedIn = storageService.get("loggedIn")
      setUserDetails({
        userId:id,
        token:token,
        isAdmin:isAdmin,
        loggedIn:loggedIn,
      });
  },[]);
  return (
      <Routes>
        {userDetails.userId ? <Route exact path="/" element={ <Displaypost/> } /> : <Route exact path="/" element={ <Login/> } />}
        <Route path="/post/:id" element={ <Displayonepost/> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/displayPost" element={ <Displaypost /> } />
        <Route path="/signup" element={ <Signup props={userDetails}/> } />
        <Route path="/create" element={ <Create/> } />
        <Route path="*" element={ <Error/> } />
      </Routes>
  );
}

export default Home;
