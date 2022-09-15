import './style.css'
import {useState} from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

function Sendpost() {
  const [imageFile, setImageFile] = useState(null);
  const [dataToSend, setDataToSend] = useState({
    title:"",
    content:"",
  });


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
    // e.target.reset();
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }

    const req = await axios.post("http://localhost:4000/api/posts", formDataToSend, config);
    console.log(req);
  }
  
  return (
    <section className="home-section">
    <Sidebar/>
    <div className="post-component">
            <form encType="multipart/form"  onSubmit={submitData}>
            <input name="title" type="text" placeholder='post title' onChange={formDataFieldChanged}/>
            <textarea name="content" id="" cols="30" rows="10" onChange={formDataFieldChanged} placeholder="enter content"></textarea>
            <input name="imageFile" type="file" onChange={imageChanged}/>
            <input type="submit" value="valider" />
            </form>
        </div>
  </section>
  )
}

export default Sendpost