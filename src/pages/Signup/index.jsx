import {useState} from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import {userService} from '../../Services/userService'

function SignUpForm() {
  const [dataToSend, setDataToSend] = useState({
    lastName:"",
    firstName:"",
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

  const submitData = async (e) => {
    e.preventDefault();
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
            <input name="lastName" type="text" placeholder='Last Name' onChange={formDataFieldChanged}/>
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged}/>
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged}/>
            <input type="submit" value="valider" />
            </form>
        </div>
        </section>
  )
}

export default SignUpForm