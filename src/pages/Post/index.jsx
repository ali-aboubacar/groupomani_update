import './style.css';
import Sidebar from '../../components/Sidebar'
import Displayonepost from '../../components/Displayonepost'

function SinglePost() {
  return (
    <section className="home-section">
      <Sidebar/>
      <Displayonepost/>
    </section>
  );
}

export default SinglePost;
