import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome,FaPenNib,FaSignOutAlt } from "react-icons/fa"
import { userService } from '../../Services/userService';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogOut = ()=>{
   userService.logout();
   navigate('/login'); 
  };
  return (
    <div className="sidebar-component">
    <div className='sidebar-divider'>
            <Link to="/displayPost"> <FaHome className='icons'/>Home</Link>
            <Link to="/create"><FaPenNib className='icons'/>Add Post</Link>
            {/* <Link to="/profile">profile</Link> */}
    </div>
    <div className='sidebar-footer'>
      <div className='footer' onClick={handleLogOut}>
      <Link to="/" > <FaSignOutAlt className='logout-icon'/>Logout</Link>
      </div>
    </div>
    </div>
  )
}

export default Sidebar