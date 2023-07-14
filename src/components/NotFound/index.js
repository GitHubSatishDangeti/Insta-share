import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689337716/Group_1_rvnuty.png"
      alt="page not found"
    />
    <h1>Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage.
    </p>
    <Link to="/">
      <button className="home-page-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
