import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

class UserPosts extends Component {
  state = {isLiked: false}

  onClickLikeToggle = async () => {
    await this.setState(prev => ({isLiked: !prev.isLiked}))
    const {isLiked} = this.state
    const token = Cookies.get('jwt_token')
    const body = {like_status: isLiked}
    console.log(body)
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
    const {postDetails} = this.props
    const {postId} = postDetails
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
      options,
    )
    const data = await response.json()
    //  console.log(data)
  }

  render() {
    const {postDetails} = this.props
    const {
      postId,
      profilePic,
      userName,
      userId,
      imageUrl,
      likesCount,
      caption,
      comments,
      createdAt,
    } = postDetails
    const {isLiked} = this.state

    return (
      <li>
        <div className="post-header">
          <Link to={`/users/${userId}`}>
            <img
              id={postId}
              className="header-img"
              src={profilePic}
              alt="post author profile"
            />
          </Link>

          <h6 htmlFor={postId}>{userName}</h6>
        </div>

        <img src={imageUrl} alt="post" width="100%" height="500px" />
        <div className="post-bottom-section">
          <ul className="unordered-list-icons">
            <li className="icons-list-item">
              {!isLiked ? (
                <button
                  onClick={this.onClickLikeToggle}
                  className="like-button"
                  type="button"
                  data-testid="likeIcon"
                >
                  <BsHeart size={15} />
                </button>
              ) : (
                <button
                  className="like-button"
                  onClick={this.onClickLikeToggle}
                  type="button"
                  data-testid="unLikeIcon"
                >
                  <FcLike size={17} />
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
          <p>{isLiked ? likesCount + 1 : likesCount} likes</p>
          <p>{caption}</p>
          <ul className="unordered-list-comments">
            {comments.map(k => (
              <li key={k.commentUserId}>
                <p>
                  <span className="comment-username">{k.commentUsername}</span>{' '}
                  {k.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-time">{createdAt}</p>
        </div>
      </li>
    )
  }
}
export default UserPosts
