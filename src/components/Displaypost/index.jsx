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
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true)
    postService.getAll().then(res=>{
      setListOfPosts(res.data);
      setLoading(false)
    });
  },[]);
  
  const handleLikes = async (postId) => {
    const req = await axios.get('http://localhost:4000/api/posts/likes/'+postId,{     
      headers: {"authorization":"Bearer "+storageService.get('token') }
  });
   setListOfPosts(
    listOfPosts.map((post) => {
      if (post.id === postId) {
        if (req.data.liked) {
          return { ...post, likesNum: post.likesNum+1 };
        } else {
          return { ...post, likesNum: post.likesNum-1 };
        }
      } else {
        return post;
      }
    })
  );
};
  return (
    <section className='home-section'>
      <Sidebar/>
      {loading ? <div className='pre-loader-wrap'><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : 
          <div className='displaypost-component'>
          {listOfPosts.map((post)=>{
             return (
              <div className='post-card' key={post.id} >
              <Link to= {`/post/${post.id}`}>
              <div className='card-header'>
              <h3>{post.user.lastName} {post.user.firstName}</h3>
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
             <span>{post.likesNum}</span>
              </div>
          </div>
             )
          })}
             
      </div>
      }

    </section >
  )
}

export default Displaypost
