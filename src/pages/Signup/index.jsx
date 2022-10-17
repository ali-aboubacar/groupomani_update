import {useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import {userService} from '../../Services/userService'
import { validEmail, validPassword, validName  } from '../../Services/regex';

function SignUpForm() {
  const [dataToSend, setDataToSend] = useState({
    lastName:"",
    firstName:"",
    email:"",
    password:"",
  });

  const [emailErr, setEmailErr] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const navigate = useNavigate();


  const validate = () => {
    let errors = false;
    if (!validName.test(dataToSend.lastName)) {
      console.log(dataToSend.lastName);
      errors =true;
      setLastNameErr(true);
   }else{
    setLastNameErr(false);
   }
    if (!validName.test(dataToSend.firstName)) {
      errors =true;
      setFirstNameErr(true);
   }else{
    setFirstNameErr(false);
   }
    if (!validEmail.test(dataToSend.email)) {
      errors =true;
       setEmailErr(true);
    }else{
      setEmailErr(false);
    }
    if (!validPassword.test(dataToSend.password)) {
      errors =true;
       setPwdError(true);
    }else{
      setPwdError(false);
    }
    return !errors;
 };

  const formDataFieldChanged = e => {
    const name = e.target.name;
    const formDataTemp = {...dataToSend};
    formDataTemp[name] = e.target.value;
    setDataToSend(formDataTemp);
}

  const submitData = async (e) => {
    e.preventDefault();
    if(!validate()){
      return ;
    }
    console.log(validate());
    try{
      const req = await userService.signup(dataToSend)
      console.log(req);
      navigate('/login');
    }catch(err){
      return err
    }
  }
  
  return ( 
    <section className='home-section'>
    <div className="signup-component">
            <form onSubmit={submitData}>
            <input name="firstName" type="text" placeholder='First Name' onChange={formDataFieldChanged}/>
            {firstNameErr&&<p>error</p>}
            <input name="lastName" type="text" placeholder='Last Name' onChange={formDataFieldChanged}/>
            {lastNameErr && <p>error</p>}
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged}/>
            {emailErr && <p>Your email is invalid</p>}
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged}/>
            {pwdError && <p>Your password is invalid</p>}
            <input type="submit" value="valider" />
            </form>
        </div>
        </section>
  )
}

export default SignUpForm