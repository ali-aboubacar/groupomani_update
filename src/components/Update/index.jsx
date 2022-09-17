import './style.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UpdateForm() {
  const [singlePost, setSinglePosts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [dataToSend, setDataToSend] = useState({
    title:"",
    content:"",
  });
  const {id} = useParams();
useEffect(()=>{
  axios.get(`http://localhost:4000/api/posts/${id}`).then((response) => {
    setSinglePosts(response.data);
  });
}, []);
  

  const formDataFieldChanged = e => {
    const name = e.target.name;
    const formDataTemp = {...dataToSend};
    formDataTemp[name] = e.target.value;
    setDataToSend(formDataTemp);
}

const imageChanged = e => {
  setImageFile(e.target.files[0]);
}

  const submitData = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', dataToSend.title);
    formDataToSend.append('content', dataToSend.content);
    formDataToSend.append('file', imageFile);
    
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

    const req = await axios.put(`http://localhost:4000/api/posts/${id}`, formDataToSend, config);
    console.log(req);
    e.target.reset();
  }
  
  return (
    <div className="post-component">
            <form encType="multipart/form"  onSubmit={submitData}>
            <input name="title" type="text" placeholder='post title' onChange={formDataFieldChanged}/>
            <textarea name="content" id="" cols="30" rows="10" onChange={formDataFieldChanged} placeholder="enter content"></textarea>
            <input name="imageFile" type="file" onChange={imageChanged} />
            <input type="submit" value="valider" />
            </form>
        </div>
  )
}

export default UpdateForm