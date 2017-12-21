import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import agent from '../agent'
import { Profile, mapStateToProps } from './Profile'

const mapDispatchToProps = dispatch => ({
  onFollow: userProfile => dispatch({ 
    type: 'FOLLOW_USER', 
    payload: agent.Profile.follow(userProfile)
  }),
  onPageLoad: payload => dispatch({ type: 'PROFILE_FAVORITES_PAGE_LOADED', payload }),
  onSetPage: (page, payload) => dispatch({
    type: 'SET_PAGE', 
    page,
    payload
  }),
  onUnfollow: userProfile => dispatch({ 
    type: 'UNFOLLOW_USER', 
    payload: agent.Profile.unfollow(userProfile)
  }),
  onPageUnload: () => dispatch({ type: 'PROFILE_FAVORITES_PAGE_UNLOADED'})
})

class ProfileFavorites extends Profile {

  componentWillMount() {
    const { match: { params: { username }}} = this.props
    console.log(username, this.props.match, this.props.profile)

    this.props.onPageLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byFavorited(username)
    ]))
  }

  componentWillUnmount() {
    this.props.onPageUnload()
  }
  
  onSetPage(page) {
    const promise = agent.Articles.byFavorited(this.props.profile.username, page)
    this.props.onSetPage(page, promise)
  }

  renderTabs = () => {
    const { profile } = this.props

    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link 
            className="nav-link"
            to={`/profiles/${profile.username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link 
            className="nav-link active"
            to={`/profiles/${profile.username}`}
          >
            Favorite Articles
          </Link>
        </li>
      </ul>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileFavorites)
