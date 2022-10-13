import './style.css'
import React,{useState, useEffect} from 'react'
import Update from '../Update'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { postService } from '../../Services/postService'
import Sidebar from '../Sidebar'
import { storageService } from '../../Services/storageService'

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function Displayonepost() {
  const [updateSinglePost, setUpdateSinglePost] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [status, setStatus] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const deletePost = async (e) =>{
    e.preventDefault();
    const config = {     
      headers: { 'content-type': 'multipart/form-data',"authorization":"Bearer "+storageService.get('token') }
  }
    try{
      const req = await axios.delete(`http://localhost:4000/api/posts/${id}`,config);
      setStatus(!status,req);
      navigate('/displayPost');
    }catch(err){
      return err
    }
  }
  const updatePost = async (e) =>{
    setUpdateSinglePost(!updateSinglePost);
  }
  
  useEffect(()=>{
    postService.getOne(id).then(res=>{
      setSinglePost(res.data);
      const id = storageService.get("userId");
      const isAdmin = storageService.get("isAdmin")
      setUserDetails({
        userId:id,
        isAdmin:isAdmin,
      });
    })
  },[id]);
  return (
    <section className='home-section'>
      <Sidebar/>
    { updateSinglePost ? <Update post={singlePost} /> :     <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' key={singlePost.id} >
    <div className='card-header'>
        <img src={singlePost.imageUrl} alt="une description complete" />
    </div>
    
    <div className='card-content'>
    <h1>{singlePost.title}</h1>
        <img src={singlePost.imageUrl} alt="une description complete" />
        <p>{singlePost.content}</p>
        <div className='card-btn'>
        {(userDetails.userId === singlePost.userId || userDetails.isAdmin) && <button onClick={deletePost}> Delete </button>}
        {(userDetails.userId === singlePost.userId || userDetails.isAdmin) && <button onClick={updatePost}> Update </button>}
        </div>
    </div>
</div>
</div>

}
</section>
)
}

export default Displayonepost
