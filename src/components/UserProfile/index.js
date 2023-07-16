import {Component} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SearchContext from '../../SearchContext/SearchContext'
import './index.css'
import SearchResult from '../SearchResults'

const apiUserStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userData: '', userStatus: apiUserStatus.initial}

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    this.setState({userStatus: apiUserStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/insta-share/users/${id}`,
      options,
    )
    // const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const data = await response.json()
      const formattedUserData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        username: data.user_details.user_name,
        profilePic: data.user_details.profile_pic,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        userBio: data.user_details.user_bio,
        posts: data.user_details.posts.map(i => ({
          postId: i.id,
          postImage: i.image,
        })),
        postsCount: data.user_details.posts_count,
        stories: data.user_details.stories.map(k => ({
          storyId: k.id,
          storyImage: k.image,
        })),
      }
      //    console.log(formattedUserData)
      this.setState({
        userStatus: apiUserStatus.success,
        userData: formattedUserData,
      })
    } else {
      this.setState({userData: '', userStatus: apiUserStatus.failure})
    }
  }

  onRetry = () => {
    this.getUser()
  }

  renderUserView = () => {
    const {userData} = this.state
    const {
      userId,
      username,
      profilePic,
      followersCount,
      followingCount,
      userBio,
      posts,
      postsCount,
      stories,
    } = userData

    const isEmpty = posts.length === 0
    return (
      <div className="bg-user">
        <div className="bg-inner-user">
          <div className="profile-details-section-user">
            <img
              src={profilePic}
              alt="user profile"
              width="180px"
              height="180px"
              className="user-pic-user"
            />
            <div className="profile-details-user">
              <h1 className="username-user">{username}</h1>
              <ul className="count-list-user">
                <li className="count-item-user">
                  <b>{postsCount}</b> posts
                </li>
                <li className="count-item-user">
                  <b>{followersCount}</b> followers
                </li>
                <li className="count-item-user">
                  <b>{followingCount}</b> following
                </li>
              </ul>
              <p>{userId}</p>
              <p>{userBio}</p>
            </div>
          </div>
          <ul className="profile-story-list-user">
            {stories.map(each => (
              <li className="story-list-item-user" key={each.storyId}>
                <img
                  src={each.storyImage}
                  alt="user story"
                  width="86px"
                  className="story-image-user"
                />
              </li>
            ))}
          </ul>
          <hr />
          <div>
            <div className="posts-section-header-user">
              <BsGrid3X3 className="post-icon-user" />
              <h4>Posts</h4>
            </div>
            {isEmpty ? (
              <div className="no-post-section-user">
                <BiCamera size={50} />
                <h1 className="no-post-user">No Posts</h1>
              </div>
            ) : (
              <ul className="post-images-list-user">
                {posts.map(each => (
                  <li className="post-image-item-user" key={each.postId}>
                    <img src={each.postImage} alt="user post" width="280px" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="failure-view-user">
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

  renderUser = () => {
    const {userStatus} = this.state
    switch (userStatus) {
      case apiUserStatus.success:
        return this.renderUserView()
      case apiUserStatus.failure:
        return this.renderProfileFailureView()
      case apiUserStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {showSearchResult} = value

          return (
            <div>
              <Header />
              {showSearchResult ? <SearchResult /> : this.renderUser()}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default UserProfile
