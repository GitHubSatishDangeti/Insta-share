import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import './index.css'
import SearchContext from '../../SearchContext/SearchContext'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SearchContext.Consumer>
      {value => {
        const {
          searchInput,
          onSearchInput,
          onClickSearch,
          makeShowSearchResultFalse,
        } = value

        const onSearchInputChange = event => {
          onSearchInput(event.target.value)
        }

        const onSearchClick = () => {
          onClickSearch()
        }

        const onLinkClick = () => {
          makeShowSearchResultFalse()
        }
        return (
          <nav className="navbar">
            <div className="logo-heading">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1688895890/Standard_Collection_8_in6daa.png"
                  alt="website logo"
                  width="35%"
                />
              </Link>
              <h2 className="header-heading">Insta Share</h2>
            </div>
            <ul className="unordered-list">
              <li className="nav-list">
                <div>
                  <input
                    value={searchInput}
                    onChange={onSearchInputChange}
                    type="search"
                    placeholder="Search Caption"
                  />
                  <button
                    id="searchButton"
                    onClick={onSearchClick}
                    type="button"
                    data-testid="searchIcon"
                  >
                    <FaSearch />
                  </button>
                </div>
              </li>
              <Link onClick={onLinkClick} to="/">
                <li className="nav-list">Home</li>
              </Link>
              <Link onClick={onLinkClick} to="/my-profile">
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
      }}
    </SearchContext.Consumer>
  )
}
export default withRouter(Header)
