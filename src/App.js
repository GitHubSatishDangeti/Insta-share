import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/protectedRoute'

import Home from './components/Home'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </>
)

export default App
