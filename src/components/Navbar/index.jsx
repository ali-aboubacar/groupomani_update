import './style.css'
import DarkLogo from '../../assets/Logo-groupomania.png'
import { Link } from 'react-router-dom'


function Navbar() {
  
  return (
        <header >
            <Link to="/">
            <img src={DarkLogo} alt='une description tres indispansable '/>
            </Link>
        </header>
  );
}

export default Navbar;
