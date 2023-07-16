import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import ReactSlider from '../ReactSlider'
import UserPosts from '../UserPosts'
import SearchResult from '../SearchResults'
import SearchContext from '../../SearchContext/SearchContext'

const apiPostsStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStoriesStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    postStatus: apiPostsStatus.initial,
    storyStatus: apiStoriesStatus.initial,
    posts: [],
    userStories: [],
  }

  componentDidMount() {
    this.getUserStories()
    this.getPosts()
  }

  getUserStories = async () => {
    this.setState({storyStatus: apiStoriesStatus.loading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.users_stories.map(i => ({
        userId: i.user_id,
        userName: i.user_name,
        storyUrl: i.story_url,
      }))
      this.setState({
        storyStatus: apiStoriesStatus.success,
        userStories: formattedData,
      })
    } else {
      this.setState({storyStatus: apiStoriesStatus.failure})
    }
  }

  getPosts = async () => {
    this.setState({postStatus: apiPostsStatus.loading})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()

      const formattedPostsData = data.posts.map(i => ({
        postId: i.post_id,
        userId: i.user_id,
        userName: i.user_name,
        profilePic: i.profile_pic,
        imageUrl: i.post_details.image_url,
        caption: i.post_details.caption,
        likesCount: i.likes_count,
        comments: i.comments.map(k => ({
          commentUsername: k.user_name,
          commentUserId: k.user_id,
          comment: k.comment,
        })),
        createdAt: i.created_at,
      }))
      this.setState({
        postStatus: apiPostsStatus.success,
        posts: formattedPostsData,
      })
      // console.log(formattedPostsData)
    } else {
      this.setState({postStatus: apiPostsStatus.failure})
    }
  }

  onPostsRetry = () => {
    this.getPosts()
  }

  onStoryRetry = () => {
    this.getUserStories()
  }

  renderPostsView = () => {
    const {posts} = this.state

    return (
      <div className="bg-posts">
        <ul className="unordered-list-post">
          {posts.map(i => (
            <UserPosts key={i.postId} postDetails={i} />
          ))}
        </ul>
      </div>
    )
  }

  renderPostsFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689236171/Icon_dskbst.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="retry-button"
        onClick={this.onPostsRetry}
        type="button"
      >
        Try agian
      </button>
    </div>
  )

  renderStoryFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689236171/Icon_dskbst.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        className="retry-button"
        onClick={this.onStoryRetry}
        type="button"
      >
        Try agian
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPost = () => {
    const {postStatus} = this.state
    switch (postStatus) {
      case apiPostsStatus.success:
        return this.renderPostsView()
      case apiPostsStatus.failure:
        return this.renderPostsFailureView()
      case apiPostsStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderStories = () => {
    const {storyStatus, userStories} = this.state
    switch (storyStatus) {
      case apiStoriesStatus.success:
        return <ReactSlider userStories={userStories} />
      case apiStoriesStatus.failure:
        return this.renderStoryFailureView()
      case apiStoriesStatus.loading:
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
              {showSearchResult ? (
                <SearchResult />
              ) : (
                <div className="bg">
                  {this.renderStories()}
                  {this.renderPost()}
                </div>
              )}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default Home
