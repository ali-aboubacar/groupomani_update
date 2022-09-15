import './style.css'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function Displayonepost() {
  const [singlePost, setSinglePosts] = useState([]);
  const [status, setStatus] = useState('');
  const {id} = useParams();
  const deletePost = async (e) =>{
    const req = await axios.delete(`http://localhost:4000/api/posts/${id}`);
    setStatus('Delete successful');
  }
  useEffect(()=>{
    fetch(`http://localhost:4000/api/posts/${id}`)
    .then((res) => res.json())
    .then((onePost) => setSinglePosts(onePost));
  },[id]);
  return (
    <div className='displaypost-component'>   
        <div className='post-card' key={singlePost.id} >
        <div className='card-header'>
            <img src={singlePost.imageUrl} alt="une description complete" />
            <h1>{singlePost.title}</h1>
        </div>
        
        <div className='card-header'>
            <p>{singlePost.content}</p>
            <img src={singlePost.imageUrl} alt="une description complete" />
            <button onClick={deletePost}> Delete </button>
        </div>
    </div>
</div>
  )
}

export default Displayonepost
