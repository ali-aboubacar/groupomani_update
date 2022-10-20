import ErrorImage from '../../assets/404-Error.svg'
import Sidebar from '../../components/Sidebar'

function ErrorPage() {
 
  return (
    <section className='home-section'>
      <Sidebar/> 
    <div className='displaypost-component'>   
    <img src={ErrorImage} alt='404 page not found' className='error-page'/>
    <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
</section>
)
}

export default ErrorPage
