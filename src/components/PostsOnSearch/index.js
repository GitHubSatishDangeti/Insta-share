import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'
import SearchContext from '../../SearchContext/SearchContext'

class PostsOnSearch extends Component {
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
    const {searchResult} = this.props
    const {postId} = searchResult
    await fetch(
      `https://apis.ccbp.in/insta-share/posts/${postId}/like`,
      options,
    )
  }

  render() {
    const {searchResult} = this.props
    const {isLiked} = this.state
    const {
      postId,
      username,
      userId,
      profilePic,
      postImageUrl,
      postCaption,
      likesCount,
      comments,
      createdAt,
    } = searchResult

    return (
      <SearchContext.Consumer>
        {value => {
          const {makeShowSearchResultFalse} = value

          const onLinkClick = () => {
            makeShowSearchResultFalse()
          }

          return (
            <div className="bg-onSearch">
              <h3 className="search-result">Search Results</h3>
              <li>
                <div className="post-header">
                  <Link onClick={onLinkClick} to={`/users/${userId}`}>
                    <img
                      id={postId}
                      className="header-img"
                      src={profilePic}
                      alt="post author profile"
                    />
                  </Link>

                  <h6 htmlFor={postId}>{username}</h6>
                </div>

                <img
                  src={postImageUrl}
                  alt="post author profile"
                  width="100%"
                  height="500px"
                />
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
                  <p>{postCaption}</p>
                  <ul className="unordered-list-comments">
                    {comments.map(k => (
                      <li key={k.commentsUserId}>
                        <p>
                          <span className="comment-username">
                            {k.commentsUsername}
                          </span>{' '}
                          {k.commentsComment}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="created-time">{createdAt}</p>
                </div>
              </li>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}
export default PostsOnSearch
