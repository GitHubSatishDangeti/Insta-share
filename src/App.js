import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/protectedRoute'
import MyProfile from './components/MyProfile'

import Home from './components/Home'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/my-profile/" component={MyProfile} />
    </Switch>
  </>
)

export default App
