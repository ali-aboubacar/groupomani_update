import './style.css'
import DarkLogo from '../../assets/Logo-groupomania.png'
import { Link } from 'react-router-dom'


function Navbar() {
  
  return (
    <div className="navbar-component">
        <header>
            <Link to="/">
            <img src={DarkLogo} alt='une description tres indispansable '/>
            </Link>
            <ul>
            <Link to="/">home</Link>
            <Link to="/create">Add Post</Link>
            <Link to="/profile">profile</Link>
            </ul>
        </header>
    </div>
  );
}

export default Navbar;
