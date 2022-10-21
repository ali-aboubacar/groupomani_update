import {useState} from 'react'
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
            <input name="firstName" type="text" placeholder='Prenom' onChange={formDataFieldChanged} className="field-input"/>
            {firstNameErr&&<p className='regex-err'>le Prenom ne possede pas de charactere speciaux ni de chiffre</p>}
            <input name="lastName" type="text" placeholder='Nom de famille' onChange={formDataFieldChanged} className="field-input"/>
            {lastNameErr && <p className='regex-err'>le Nom de famille ne possede pas de charactere speciaux ni de chiffre</p>}
            <input name="email" type="email" placeholder='e-mail' onChange={formDataFieldChanged} className="field-input"/>
            {emailErr && <p className='regex-err'>Votre email est incorrect</p>}
            <input name="password" type="password" placeholder='Password' onChange={formDataFieldChanged} className="field-input"/>
            {pwdError && <p className='regex-err'>Votre mots de passe est incorrect</p>}
            <input type="submit" value="valider" className='style-btn'/>
            </form>
        </div>
        </section>
  )
}

export default SignUpForm