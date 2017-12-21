import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import agent from '../agent'
import ArticleList from './ArticleList'

export const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  onFollow: userProfile => dispatch({ 
    type: 'FOLLOW_USER', 
    payload: agent.Profile.follow(userProfile)
  }),
  onPageLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
  onSetPage: (page, payload) => dispatch({
    type: 'SET_PAGE', 
    page,
    payload
  }),
  onUnfollow: userProfile => dispatch({ 
    type: 'UNFOLLOW_USER', 
    payload: agent.Profile.unfollow(userProfile)
  }),
  onPageUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED'})
})

const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link to={'/settings'} class="btn btn-sm btn-outline-secondary action-btn">
        <i class="ion-gear-a"></i> Edit Profile Settings
      </Link>
    )
  }
  
  return null
}

const FollowUserButton = (props) => {
  if (props.isUser) {
    return null
  }

  let classes = 'btn btn-sm action-btn'
  if (props.user.follwoing) {
    classes += ' btn-secondary'
  } else {
    classes += 'btn-outline-secondary'
  }

  const handleClick = (ev) => {
    ev.preventDefault()

    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  }

  return (
    <button
      className={classes}
      onClick={handleClick}
    >
      <i className="ion-plus-round"></i>
      &nbsp;
      { props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  )
}

export class Profile extends Component {

  componentWillMount() {
    const { match: { params: { username }}} = this.props

    this.props.onPageLoad(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username)
    ]))
  }

  componentWillUnmount() {
   this.props.onPageUnload() 
  }

  renderTabs = () => {
    const { match: { params: { username }}} = this.props

    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link 
            className="nav-link active"
            to={`/profiles/${username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link 
            className="nav-link"
            to={`/profiles/${username}/favorites`}
          >
            Favorite Articles
          </Link>
        </li>
      </ul>
    )
  }

  onSetPage(page) {
    const promise = agent.Articles.byAuthor(this.props.profile.username, page)
    this.props.onSetPage(page, promise)
  }

  render() {
    const { profile, match, currentUser } = this.props

    const isUser = currentUser && 
      currentUser.username === profile.username

    const onSetPage = page => this.onSetPage(page)

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                {profile.username ? 
                  (
                    <div>
                      <img className="user-img" src={profile.image} alt="user " />
                      <h4>{profile.username}</h4>
                      <p>{profile.bio}</p>

                      <EditProfileSettings isUser={isUser} />
                      <FollowUserButton 
                        isUser={isUser}
                        user={profile}
                        follow={this.props.onFollow}
                        unfollow={this.props.onUnfollow}
                      />
                    </div>
                  ) : ( 
                    <h4>We could not find a user by the name {match.params.username}</h4>
                  )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="article-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList 
                articles={this.props.articles} 
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                onSetPage={onSetPage}
              />

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
