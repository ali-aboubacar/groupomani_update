import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { userService } from '../../Services/userService';


// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'


function LoginForm() {
  const [dataToSend, setDataToSend] = useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();

  const formDataFieldChanged = e => {
    const name = e.target.name;
    const formDataTemp = {...dataToSend};
    formDataTemp[name] = e.target.value;
    setDataToSend(formDataTemp);
}

const config = {     
  headers: { 'content-type': 'Application/json' }
}

  const loginUser = async (e) =>{
    e.preventDefault();
    const res = await userService.login(dataToSend);
    console.log(res);
    navigate('/');
  }

  return (
    <section className="home-section">
   <div className='displaypost-component' id='displaypost-id'>   
    <div className='post-card' >
    <form onSubmit={loginUser}>
            <input name="email" type="email" placeholder='email' onChange={formDataFieldChanged}/>
            <input name="password" type="password" placeholder='password' onChange={formDataFieldChanged}/>
            <input type="submit" value="Login" />
            </form>
        <Link to='/signup'>Sign Up</Link>
</div>
</div>
</section>
)
}

export default LoginForm
