import './style.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'

 
function Displaypost() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/api/posts')
    .then((res) => res.json())
    .then((allPosts) => setPosts(allPosts));
  },[]);
  return (
    <div className='displaypost-component'>
        {posts.map((post)=>{
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
        </div>
           )
        })}
    </div>
  )
}

export default Displaypost
