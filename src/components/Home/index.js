import {Component} from 'react'
import Cookies from 'js-cookie'
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
      console.log(data)
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
    }
  }

  render() {
    const {userStories} = this.state

    return (
      <div>
        <Header />
        <ReactSlider userStories={userStories} />
      </div>
    )
  }
}
export default Home
