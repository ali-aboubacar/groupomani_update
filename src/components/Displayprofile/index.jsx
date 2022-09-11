import './style.css'
import DisplayPic from '../../assets/user-profile.png'
function Displayprofile() {

  return (
    <div className='display-profile-component'>
      <div className='profile-header'>
        <img src={DisplayPic} alt="some great description for this" />
      </div>
      <div className='profile-info'></div>
    </div>
  )
}

export default Displayprofile
