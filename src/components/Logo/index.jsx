import './style.css'
import DarkLogo from '../../assets/Logo-groupomania.svg'
import { Link } from 'react-router-dom'

function Logo() {
  
  return (
        <header >
            <Link to="/displayPost">
            <img src={DarkLogo} alt='une description tres indispansable '/>
            </Link>
        </header>
  );
}

export default Logo;
