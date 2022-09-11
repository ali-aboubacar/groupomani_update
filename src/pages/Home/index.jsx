import './style.css';
import Sidebar from '../../components/Sidebar'
import Displaypost from '../../components/Displaypost'

function Home() {
  return (
    <section className="home-section">
      <Sidebar/>
      <Displaypost/>
    </section>
  );
}

export default Home;
