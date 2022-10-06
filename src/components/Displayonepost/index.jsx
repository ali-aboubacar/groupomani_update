import './style.css'
import React,{useState, useEffect} from 'react'
import Update from '../Update'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { postService } from '../../Services/postService'

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function Displayonepost({props}) {
  const [updateSinglePost, setUpdateSinglePost] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const [status, setStatus] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();

  const deletePost = async (e) =>{
    e.preventDefault();
    try{
      const req = await axios.delete(`http://localhost:4000/api/posts/${id}`);
      setStatus(!status,req);
      navigate('/');
    }catch(err){
      return err
    }
  }
  const updatePost = async (e) =>{
    setUpdateSinglePost(!updateSinglePost);
    // const data = singlePost.filter(i => i.id !== singlePost.id)
    // setSinglePosts({data})
  }
  useEffect(()=>{
    postService.getOne(id).then(res=>{
      setSinglePost(res.data);
    })
  },[id]);
  console.log('$$$$$$$$$$$',props.userId, props.isAdmin, singlePost.userId);
  return (
    <>
    { updateSinglePost ? <Update post={singlePost} /> :     <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' key={singlePost.id} >
    <div className='card-header'>
        <img src={singlePost.imageUrl} alt="une description complete" />
    </div>
    
    <div className='card-content'>
    <h1>{singlePost.title}</h1>
        <img src={singlePost.imageUrl} alt="une description complete" />
        <p>{singlePost.content}</p>
        {props.userId === singlePost.userId && <button onClick={deletePost}> Delete </button>}
        {props.userId === singlePost.userId && <button onClick={updatePost}> Update </button>}
       {props.isAdmin && <button onClick={deletePost}> Delete as Admin</button>}

    </div>
</div>
</div>

}
</>
)
}

export default Displayonepost
