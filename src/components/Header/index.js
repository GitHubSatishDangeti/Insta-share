import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="logo-heading">
        <img
          src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1688895890/Standard_Collection_8_in6daa.png"
          alt="website-logo"
          width="35%"
        />
        <h2 className="header-heading">Insta Share</h2>
      </div>
      <ul className="unordered-list">
        <li className="nav-list">
          <div>
            <input type="search" />
            <button type="button" data-testid="searchIcon">
              <FaSearch />
            </button>
          </div>
        </li>
        <Link to="/">
          <li className="nav-list">Home</li>
        </Link>
        <Link to="/my-profile">
          <li className="nav-list">Profile</li>
        </Link>
        <li className="nav-list">
          <button onClick={onLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
