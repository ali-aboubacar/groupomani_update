import './style.css'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar-component">

<ul>
            <Link to="/">home</Link>
            <Link to="/create">Add Post</Link>
            <Link to="/profile">profile</Link>
            </ul>
    </div>
  )
}

export default Sidebar