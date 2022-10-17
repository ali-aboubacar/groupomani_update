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
  return !errors;
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
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged} className="field-input"/>
            {emailErr && <p className='regex-err'>Votre email est incorrect</p>}
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged} className="field-input"/>
            {pwdError && <p className='regex-err'>Votre mots de passe est incorrect</p>}
            <input type="submit" value="Connexion" className='style-btn' />
            <Link to='/signup'>Créer un compte</Link>
            </form>
        </div>
        </section>

)
}

export default LoginForm
