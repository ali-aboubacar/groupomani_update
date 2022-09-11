import './style.css';
import Sidebar from '../../components/Sidebar'
import Displayprofile from '../../components/Displayprofile'

function Profile() {
  return (
    <section className="profile-section">
      <Sidebar/>
      <Displayprofile/>
    </section>
  );
}

export default Profile;
