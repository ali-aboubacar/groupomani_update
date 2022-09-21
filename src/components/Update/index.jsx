import './style.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UpdateForm() {
  const [singlePost, setSinglePost] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [dataToSend, setDataToSend] = useState({
    title:singlePost.title,
    content:singlePost.content,
  });
  const {id} = useParams();
useEffect(()=>{
  axios.get(`http://localhost:4000/api/posts/${id}`).then((res) => {
    setSinglePost(res.data);
  });
}, [id]);
  

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
    
      try {
          const res = await axios.put(`http://localhost:4000/api/posts/${id}`, formDataToSend);
          console.log(res.data);
          e.target.reset();
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  }
  
  return (
    <div className="post-component">
            <form encType="multipart/form"  onSubmit={submitData}>
            <input name="title" type="text" placeholder='entree un titre' onChange={formDataFieldChanged} />
            <textarea name="content" id="" cols="30" rows="10" onChange={formDataFieldChanged} placeholder="enter content"></textarea>
            <input name="imageFile" type="file" onChange={imageChanged} />
            <input type="submit" value="valider" />
            </form>
        </div>
  )
}

export default UpdateForm