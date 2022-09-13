import './style.css'
import {useState, useEffect} from 'react'
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
  setImageFile(e.target.file[0]);
}

  const submitData = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', dataToSend.title);
    formDataToSend.append('content', dataToSend.content);
    formDataToSend.append('file', imageFile);
    // e.target.reset();


    const req = await axios.post('http://localhost:4000/api/posts', formDataToSend);
    console.log(req);
  }

//   useEffect(() => {
//     // POST request using fetch inside useEffect React hook
//     submitData();
// });
  return (
    <section className="home-section">
    <Sidebar/>
    <div className="card text-center m-3">
            <form onSubmit={submitData}>
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