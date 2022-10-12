import './style.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { postService } from '../../Services/postService';
import { FaRegThumbsUp } from "react-icons/fa";
// import {Route} from "react-router-dom"
import axios from 'axios'
import { storageService } from '../../Services/storageService';
import Sidebar from '../Sidebar';
// import DisplayPic from '../../assets/user-profile.png'
 
function Displaypost() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [userOwner,setUserOwner] = useState();
  useEffect(()=>{
    postService.getAll().then(res=>{
      setListOfPosts(res.data);
    });
  },[]);
  const postOwner = async(userId)=>{
    const req = await axios.get('http://localhost:4000/api/auth/user/'+userId,{     
      headers: {"authorization":"Bearer "+storageService.get('token') }
  });
  console.log(req.data)
  };
  const handleLikes = async (postId) => {
    const req = await axios.get('http://localhost:4000/api/posts/likes/'+postId,{     
      headers: {"authorization":"Bearer "+storageService.get('token') }
  });
  const res = await setListOfPosts(
    listOfPosts.map((post) => {
      if (post.id === postId) {
        if (req.data.liked) {
          return { ...post, likes: [...post.likes, 0] };
        } else {
          const likesArray = post.likes;
          likesArray.pop();
          return { ...post, likes: likesArray };
        }
      } else {
        return post;
      }
    })
  );
console.log(res);
};
  return (
    <section className='home-section'>
      <Sidebar/>
    <div className='displaypost-component'>
        {listOfPosts.map((post)=>{
           return (
            <div className='post-card' key={post.id} onChange={postOwner(post.userId)} >
            <Link to= {`/post/${post.id}`}>
            <div className='card-header'>
                <img src={post.imageUrl} alt="une description complete" />
                <h3></h3>
            </div>
            <div className='card-content'>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
                <img src={post.imageUrl} alt="une description complete" />
            </div>
            </Link>
            <div className='card-footer'>
            <FaRegThumbsUp className='likesBtn' onClick={()=>{
            handleLikes(post.id);
           }}/>
           <span>{post.likes.length}</span>
            </div>
        </div>
           )
        })}
           
    </div>
    </section >
  )
}

export default Displaypost
