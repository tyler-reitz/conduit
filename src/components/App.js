import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import agent from '../agent'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Settings from './Settings'
import Article from './Article'
import Profile from './Profile'
import ProfileFavorites from './ProfileFavorites'


const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: 'APP_LOAD', payload, token }),
  redirect: () => dispatch({ type: 'REDIRECT' })
})

class App extends React.Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    
    if (token) {
      agent.setToken(token)
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  componentWillReceiveProps({ redirectTo }) {
    const { history, redirect } = this.props
     
    if (redirectTo) {
      history.replace(redirectTo)
      redirect()
    }
  }

  render() {
    const { appName, currentUser } = this.props

    return (
      <div>
        <Header appName={appName} currentUser={currentUser} />
        {this.props.appLoaded && (
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/settings" component={Settings} />
            <Route path="/article/:id"  component={Article} />
            <Route exact path="/profiles/:username" component={Profile} />
            <Route exact path="/profiles/:username/favorites" component={ProfileFavorites} />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
