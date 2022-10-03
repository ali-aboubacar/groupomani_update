import {useState} from 'react'
import './style.css'
import {useNavigate, Link} from 'react-router-dom'
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

  const loginUser = async (e) =>{
    e.preventDefault();
    try{
      const res = await userService.login(dataToSend);
      console.log('##########',res);
      navigate('/');
    }catch(err){
      return err
    }
  }

  return (
    <section className="home-section">
    <div className="login-component">
            <form onSubmit={loginUser}>
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged}/>
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged}/>
            <input type="submit" value="valider" />
            </form>
            <Link to='/signup'>Sign Up</Link>
        </div>
        </section>
)
}

export default LoginForm
