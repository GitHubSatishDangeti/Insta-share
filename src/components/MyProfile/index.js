import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiProfileStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {profileStatus: apiProfileStatus.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: apiProfileStatus.loading})
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/insta-share/my-profile',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      this.setState({profileStatus: apiProfileStatus.success})
    }
  }

  // renderProfileview=()=>
  // (
  //      <div>
  //         <div>
  //           <img src={} alt="" />
  //           <div>
  //             <h1>{}</h1>
  //             <ul>
  //               <li>{}</li>
  //               <li>{}</li>
  //               <li>{}</li>
  //             </ul>
  //             <p>{}</p>
  //             <p>{}</p>
  //           </div>
  //         </div>
  //         <ul>{}</ul>
  //         <hr />
  //         <div>
  //           <div>
  //             <img src={} alt="" />
  //             <h4>Posts</h4>
  //           </div>
  //           <ul>{}</ul>
  //         </div>
  //       </div>
  // )

  onStoryRetry = () => {
    this.getProfile()
  }

  renderProfileFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689250144/Group_7522_rpwa4l.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button className="retry-button" onClick={this.onRetry} type="button">
        Try agian
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiProfileStatus.success:
        return this.renderPostsView()
      case apiProfileStatus.failure:
        return this.renderProfileFailureView()
      case apiProfileStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderProfileView()}
      </div>
    )
  }
}
export default MyProfile
