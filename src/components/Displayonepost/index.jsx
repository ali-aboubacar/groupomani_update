import './style.css'
import {useState, useEffect} from 'react'
import Update from '../Update'
import {useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function Displayonepost() {
  const [singlePost, setSinglePosts] = useState([]);
  const [status, setStatus] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const deletePost = async (e) =>{
    const req = await axios.delete(`http://localhost:4000/api/posts/${id}`);
    setStatus(!status,req);
    navigate('/');
  }
  const updatePost = async (e) =>{
    setIsUpdate(!isUpdate);
    // const data = singlePost.filter(i => i.id !== singlePost.id)
    // setSinglePosts({data})
  }
  useEffect(()=>{
    fetch(`http://localhost:4000/api/posts/${id}`)
    .then((res) => res.json())
    .then((onePost) => setSinglePosts(onePost));
  },[id]);
  return (
    <>
    { isUpdate ? <Update /> :     <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' key={singlePost.id} >
    <div className='card-header'>
        <img src={singlePost.imageUrl} alt="une description complete" />
        <h1>{singlePost.title}</h1>
    </div>
    
    <div className='card-header'>
        <p>{singlePost.content}</p>
        <img src={singlePost.imageUrl} alt="une description complete" />
        <button onClick={deletePost}> Delete </button>
       <button onClick={updatePost}>Update</button>

    </div>
</div>
</div>

}
</>
)
}

export default Displayonepost
