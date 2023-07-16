import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import SearchResult from '../SearchResults'
import SearchContext from '../../SearchContext/SearchContext'

const apiProfileStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {profileStatus: apiProfileStatus.initial, profileData: ''}

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
      const formattedProfileData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        username: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        posts: data.profile.posts.map(i => ({
          postId: i.id,
          postImage: i.image,
        })),
        postsCount: data.profile.posts_count,
        stories: data.profile.stories.map(k => ({
          storyId: k.id,
          storyImage: k.image,
        })),
      }
      console.log(formattedProfileData)
      this.setState({
        profileStatus: apiProfileStatus.success,
        profileData: formattedProfileData,
      })
    } else {
      this.setState({profileStatus: apiProfileStatus.failure})
    }
  }

  renderProfileview = () => {
    const {profileData} = this.state
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
    } = profileData
    return (
      <div className="bg">
        <div className="bg-inner">
          <div className="profile-details-section">
            <img
              src={profilePic}
              alt="my profile"
              width="180px"
              height="180px"
            />
            <div className="profile-details">
              <h1 className="username">{username}</h1>
              <ul className="count-list">
                <li>
                  <b>{postsCount}</b> posts
                </li>
                <li>
                  <b>{followersCount}</b> followers
                </li>
                <li>
                  <b>{followingCount}</b> following
                </li>
              </ul>
              <b>{userId}</b>
              <p>{userBio}</p>
            </div>
          </div>
          <ul className="profile-story-list">
            {stories.map(each => (
              <li className="story-list-item" key={each.storyId}>
                <img
                  src={each.storyImage}
                  alt="my story"
                  width="86px"
                  className="story-image"
                />
              </li>
            ))}
          </ul>
          <hr />
          <div>
            <div className="posts-section-header">
              <img
                src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689313739/Vector_egqhi6.png"
                alt="post-icon"
                className="post-icon"
              />
              <h4>Posts</h4>
            </div>
            <ul className="post-images-list">
              {posts.map(each => (
                <li className="post-image-item" key={each.postId}>
                  <img src={each.postImage} alt="my post" width="280px" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

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
        return this.renderProfileview()
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
      <SearchContext.Consumer>
        {value => {
          const {showSearchResult} = value

          return (
            <div>
              <Header />
              {showSearchResult ? <SearchResult /> : this.renderProfile()}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default MyProfile
