import './style.css'
import {useState, useEffect} from 'react'
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
            <div className='post-card' key={post.id}>
            <div className='card-header'>
                {/* <img src={post.imageUrl} alt="une description complete" /> */}
                <h1>{post.title}</h1>
            </div>
            <div className='card-header'>
                <p>{post.content}</p>
            </div>
        </div>
           )
        })}
    </div>
  )
}

export default Displaypost
