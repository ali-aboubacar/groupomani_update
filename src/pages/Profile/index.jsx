import './style.css'
import {useState, useEffect} from 'react'
// import EditProfile from '../../components/Editprofile'

import { userService } from '../../Services/userService'
import { storageService } from '../../Services/storageService';

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function Displayprofile() {
  const [editProfile, setEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const id = storageService.get('userId')
  const editProfileImg = async (e) =>{
    e.preventDefault();
    setEditProfile(!editProfile);
    // const data = singlePost.filter(i => i.id !== singlePost.id)
    // setSinglePosts({data})
  }
  useEffect(()=>{
    userService.getCurrentUser(id).then(res=>{
      setUserProfile(res.data);
    })
  },[id]);
  return (
    <section className="home-section">
    <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' key={userProfile.id}>
    <div className='card-header'>
        <img src={userProfile.profileImg} alt="une description complete" />
    </div> 
    <div className='card-content'>
    <h1>{userProfile.lastName}</h1>
        <p>{userProfile.firstName}</p>
       <button onClick={editProfileImg}>Update Profile</button>
    </div>
</div>
</div>
</section>
)
}

export default Displayprofile
