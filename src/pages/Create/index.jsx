import './style.css'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { useEffect } from 'react';
import { postService } from '../../Services/postService';



function Sendpost() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dataToSend, setDataToSend] = useState({
    title:"",
    content:"",
  });
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(imageFile){
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  },[imageFile])
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
    
  try{
    const req = await postService.create(formDataToSend)
    console.log(req.data);
    setImagePreview(null);
    navigate('/displayPost');
  }catch(err){
    console.error(err);
  }

  }
  
  return (
    <section className='home-section'>
      <Sidebar/>
      <div className='displaypost-component'>
    <div className="post-component">
            <form encType="multipart/form"  onSubmit={submitData}>
            <input name="title" type="text" placeholder='post title' onChange={formDataFieldChanged}/>
            <textarea name="content" id="" cols="30" rows="10" onChange={formDataFieldChanged} placeholder="enter content"></textarea>
            <input name="imageFile" type="file" onChange={imageChanged}/>
            {imagePreview && <img src={imagePreview} alt="preview de Votre Selection" />}
            <input type="submit" value="valider" />
            </form>
        </div>
        </div>
        </section>
  )
}

export default Sendpost