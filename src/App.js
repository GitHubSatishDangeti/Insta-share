import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/protectedRoute'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import Home from './components/Home'
import SearchContext from './SearchContext/SearchContext'

class App extends Component {
  state = {
    showSearchResult: false,
    searchInput: '',
    apiStatus: '',
    searchResult: [],
  }

  makeShowSearchResultFalse = () => {
    this.setState({showSearchResult: false})
  }

  onSearchInput = searchInput => {
    this.setState({searchInput})
  }

  onClickSearch = async () => {
    this.setState({apiStatus: 'loading', showSearchResult: true})
    const {searchInput} = this.state

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.posts.map(i => ({
        postId: i.post_id,
        username: i.user_name,
        userId: i.user_id,
        profilePic: i.profile_pic,
        postImageUrl: i.post_details.image_url,
        postCaption: i.post_details.caption,
        likesCount: i.likes_count,
        comments: i.comments.map(k => ({
          commentsUsername: k.user_name,
          commentsUserId: k.user_id,
          commentsComment: k.comment,
        })),
        createdAt: i.created_at,
      }))

      console.log(formattedData)
      this.setState({
        apiStatus: 'success',
        searchResult: formattedData,
        // searchInput: '',
      })
    } else {
      this.setState({apiStatus: 'failure', searchResult: []})
    }
  }

  render() {
    const {searchInput, searchResult, showSearchResult, apiStatus} = this.state

    return (
      <SearchContext.Provider
        value={{
          searchInput,
          apiStatus,
          searchResult,
          showSearchResult,
          onSearchInput: this.onSearchInput,
          onClickSearch: this.onClickSearch,
          makeShowSearchResultFalse: this.makeShowSearchResultFalse,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile/" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
