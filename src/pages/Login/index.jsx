import {useState} from 'react'
import './style.css'
import {useNavigate, Link} from 'react-router-dom'
import { userService } from '../../Services/userService';
import { validEmail, validPassword  } from '../../Services/regex';

// import {Route} from "react-router-dom"
// import DisplayPic from '../../assets/user-profile.png'




function LoginForm() {
  const [dataToSend, setDataToSend] = useState({
    email:"",
    password:"",
  });
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const navigate = useNavigate();
  
  const formDataFieldChanged = e => {
    const name = e.target.name;
    const formDataTemp = {...dataToSend};
    formDataTemp[name] = e.target.value;
    setDataToSend(formDataTemp);
}

const validate = () => {
  let errors = false;
  if (!validEmail.test(dataToSend.email)) {
    errors = true;
     setEmailErr(true);
  }else{
    setEmailErr(false);
  }
  if (!validPassword.test(dataToSend.password)) {
    errors = true;
     setPwdError(true);
  }else{
    setPwdError(false);
  }
};
  const loginUser = async (e) =>{
    e.preventDefault();
    if(!validate()){
      return ;
    }
    try{
      const res = await userService.login(dataToSend);
      console.log("@@@@@@@@@@",res)
      navigate('/displayPost');
    }catch(err){
      return err
    }
  }

  return (
    <section className='home-section'>
    <div className="login-component">
            <form onSubmit={loginUser}>
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged}/>
            {emailErr && <p>Your email is invalid</p>}
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged}/>
            {pwdError && <p>Your password is invalid</p>}
            <input type="submit" value="valider" />
            </form>
            <Link to='/signup'>Sign Up</Link>
        </div>
        </section>

)
}

export default LoginForm
