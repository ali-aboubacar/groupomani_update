import './style.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { postService } from '../../Services/postService';
import { FaRegHeart } from "react-icons/fa";
// import {Route} from "react-router-dom"
import axios from 'axios'
import { storageService } from '../../Services/storageService';
// import DisplayPic from '../../assets/user-profile.png'
 
function Displaypost() {
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(()=>{
    postService.getAll().then(res=>{
      setListOfPosts(res.data);
    });
  },[]);

  const handleLikes = async (postId) => {
    const req = await axios.get('http://localhost:4000/api/posts/likes/'+postId,{     
      headers: {"authorization":"Bearer "+storageService.get('token') }
  });
    console.log('##############',req)

};
  return (
    <div className='displaypost-component'>
        {listOfPosts.map((post)=>{
           return (
            <div className='post-card' key={post.id} >
            <Link to= {`/post/${post.id}`}>
            <div className='card-header'>
                <img src={post.imageUrl} alt="une description complete" />
            </div>

            <div className='card-content'>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
                <img src={post.imageUrl} alt="une description complete" />
            </div>
            </Link>
            <FaRegHeart className='likes-component' onClick={()=>{
            handleLikes(post.id);
           }}/>
        </div>
           )
        })}
           
    </div>
  )
}

export default Displaypost
