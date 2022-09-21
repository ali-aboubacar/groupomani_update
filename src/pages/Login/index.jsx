import {useState} from 'react'
import Signup from '../../components/Signup'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function LoginForm() {
  const [isUpdate, setIsUpdate] = useState(false);
  const [status, setStatus] = useState(false);
  // const [dataToSend, setDataToSend] = useState({
  //   email:"",
  //   password:"",
  // });
  const navigate = useNavigate();

//   const formDataFieldChanged = e => {
//     const name = e.target.name;
//     const formDataTemp = {...dataToSend};
//     formDataTemp[name] = e.target.value;
//     setDataToSend(formDataTemp);
// }

  const loginUser = async (e) =>{
    const req = await axios.post(`http://localhost:4000/api/posts//login`);
    setStatus(!status,req);
    navigate('/');
  }

  const signupUser = async (e) =>{
    setIsUpdate(!isUpdate);
    // const data = singlePost.filter(i => i.id !== singlePost.id)
    // setSinglePosts({data})
  }

  return (
    <>
    { isUpdate ? <Signup /> :     <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' >

    
    <div className='card-content'>
        <button onClick={loginUser}> Delete </button>
       <button onClick={signupUser}>Update</button>

    </div>
</div>
</div>

}
</>
)
}

export default LoginForm
