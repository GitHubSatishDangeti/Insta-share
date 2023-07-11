import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'
import Header from '../Header'
import ReactSlider from '../ReactSlider'

const apiStoriesStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const apiPostsStatus = {
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
    isLiked: false,
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
      console.log(formattedPostsData)
    } else {
      this.setState({postStatus: apiPostsStatus.failure})
    }
  }

  onClickLike = event => {
    this.setState({isLiked: true})
  }

  onClickDisLike = id => {
    this.setState({isLiked: false})
  }

  renderPostsView = () => {
    const {posts, isLiked} = this.state

    return (
      <div className="bg-posts">
        <ul className="unordered-list-post">
          {posts.map(i => (
            <li key={i.postId}>
              <div className="post-header">
                <img
                  className="header-img"
                  src={i.profilePic}
                  alt="post author profile"
                />
                <h6>{i.userName}</h6>
              </div>
              <img src={i.imageUrl} alt="post" width="100%" height="500px" />
              <div className="post-bottom-section">
                <ul className="unordered-list-icons">
                  <li className="icons-list-item">
                    {!isLiked ? (
                      <button
                        id={i.postId}
                        onClick={this.onClickLike}
                        className="like-button"
                        type="button"
                        data-testid="likeIcon"
                      >
                        <BsHeart size="15px" />
                      </button>
                    ) : (
                      <button
                        id={i.postId}
                        className="like-button"
                        onClick={this.onClickDisLike}
                        type="button"
                        data-testid="unLikeIcon"
                      >
                        <FcLike />
                      </button>
                    )}
                  </li>
                  <li className="icons-list-item">
                    <FaRegComment />
                  </li>
                  <li className="icons-list-item">
                    <BiShareAlt />
                  </li>
                </ul>
                <p>{i.likesCount} likes</p>
                <p>{i.caption}</p>
                <ul className="unordered-list-comments">
                  {i.comments.map(k => (
                    <li key={k.commentUserId}>
                      <p>
                        <span className="comment-username">
                          {k.commentUsername}
                        </span>{' '}
                        {k.comment}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="created-time">{i.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {userStories} = this.state

    return (
      <div>
        <Header />
        <ReactSlider userStories={userStories} />
        {this.renderPostsView()}
      </div>
    )
  }
}
export default Home
