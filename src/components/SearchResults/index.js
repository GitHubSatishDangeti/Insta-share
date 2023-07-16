import Loader from 'react-loader-spinner'
import './index.css'
import PostsOnSearch from '../PostsOnSearch'
import SearchContext from '../../SearchContext/SearchContext'

const SearchResult = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchResult, apiStatus} = value

      const renderPostsView = () => (
        <div className="bg-posts">
          <ul className="unordered-list-post">
            {searchResult.map(i => (
              <PostsOnSearch key={i.postId} searchResult={i} />
            ))}
          </ul>
        </div>
      )

      const renderPostsFailureView = () => (
        <div className="failure-view">
          <img
            src="https://res.cloudinary.com/dhcf8dqbi/image/upload/v1689509752/Group_2_kwt87k.png"
            alt="failure view"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )

      const renderLoadingView = () => (
        <div className="loader-container loader" data-testid="loader">
          <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
        </div>
      )

      const renderPost = () => {
        switch (apiStatus) {
          case 'success':
            return renderPostsView()
          case 'failure':
            return renderPostsFailureView()
          case 'loading':
            return renderLoadingView()

          default:
            return null
        }
      }

      return <div className="bg">{renderPost()}</div>
    }}
  </SearchContext.Consumer>
)

export default SearchResult
