import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, error: ''}

  submitSuccess = JwtToken => {
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.submitSuccess(data.jwt_token)
      //  console.log(data.jwt_token)
    } else {
      const data = await response.json()
      this.setState({showError: true, error: data.error_msg})
    }
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    const {username, password, showError, error} = this.state

    return (
      <div className="bg">
        <div className="login-bg">
          <img
            className="landing-img"
            src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1688893819/Layer_2_wsq0fe.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm} className="form">
            <img
              src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1688895890/Standard_Collection_8_1_ffqfg8.png"
              alt="website login"
            />
            <h3 className="logo-heading">Insta Share</h3>
            <div className="username-label">
              <label className="label-font" htmlFor="username">
                USERNAME
              </label>

              <input
                onChange={this.onUsernameChange}
                className="input"
                type="text"
                id="username"
                value={username}
              />
            </div>
            <div className="username-label">
              <label className="label-font" htmlFor="password">
                PASSWORD
              </label>

              <input
                onChange={this.onPasswordChange}
                className="input"
                type="password"
                id="password"
                value={password}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {!showError ? null : <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
