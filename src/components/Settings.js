import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import ListErrors from './ListErrors'


class SettingsForm extends Component {

  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  }

  componentWillMount() {
    const { currentUser } = this.props

    if (currentUser) {
      const { image, bio, username, email, password } = currentUser

      this.setState({
        image: image || '',
        username: username || '',
        bio: bio || '',
        email: email || '',
        password: password || ''
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = this.props

    if (currentUser) {
      const { image, bio, username, email, password } = currentUser

      this.setState({
        image: image || '',
        username: username || '',
        bio: bio || '',
        email: email || '',
        password: password || ''
      })
    }
  }

  submitForm = ev => {
    ev.preventDefault()

    const { state: user } = this
    if (!user.password) {
      delete user.password
    }

    this.props.onSubmitForm({ user: user })
  }
  
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input 
              className="form-control" 
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={ev => this.setState({ image: ev.target.value })}
          />
          </fieldset>

          <fieldset className="form-group">
            <input 
              className="form-control" 
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={ev => this.setState({ username: ev.target.value })}
          />
          </fieldset>

          <fieldset className="form-group">
            <input 
              className="form-control" 
              type="text"
              placeholder="Short bio about yourelf"
              value={this.state.bio}
              onChange={ev => this.setState({ bio: ev.target.value })}
          />
          </fieldset>

          <fieldset className="form-group">
            <input 
              className="form-control" 
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={ev => this.setState({ email: ev.target.value })}
          />
          </fieldset>

          <fieldset className="form-group">
            <input 
              className="form-control" 
              type="password"
              placeholder="New Password"
              value={this.state.password}
              onChange={ev => this.setState({ password: ev.target.value })}
          />
          </fieldset>

          <button 
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.props.inProgress}
          >
            Update Settings
          </button>

        </fieldset>
      </form>
    )
  }
}

class Settings extends Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container-page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors} />

              <SettingsForm 
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm}
                inProgress={this.props.inProgress}
              />

              <hr />

              <button 
                className="btn btn-outline-danger"
                onClick={this.props.onLogout}
                disabled={this.props.inProgress}
              >
                Or click here to logout
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({ type: 'LOGOUT' }),
  onSubmitForm: user => dispatch({ type: 'SETTINGS_SAVED', payload: agent.Auth.save(user)  })
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
