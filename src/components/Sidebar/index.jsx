import './style.css'
import { Link } from 'react-router-dom'
import { FaHome,FaPenNib,FaSignOutAlt } from "react-icons/fa"

function Sidebar() {
  return (
    <div className="sidebar-component">
    <div className='sidebar-divider'>
            <Link to="/"> <FaHome className='icons'/>Home</Link>
            <Link to="/create"><FaPenNib className='icons'/>Add Post</Link>
            {/* <Link to="/profile">profile</Link> */}
    </div>
    <div className='sidebar-footer'>
      <div className='footer'>
      <Link to="/"> <FaSignOutAlt className='logout-icon'/>Logout</Link>
      </div>
    </div>
    </div>
  )
}

export default Sidebar