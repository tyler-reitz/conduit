import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import agent from '../agent'
import ListErrors from './ListErrors'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({ type: 'UPDATE_FIELD_AUTH', payload: { key: 'email', value }}),
  onChangeUsername: value => dispatch({ type: 'UPDATE_FIELD_AUTH', payload: { key: 'username', value }}),
  onChangePassword: value => dispatch({ type: 'UPDATE_FIELD_AUTH', payload: { key: 'password', value }}),
  onSubmitForm: (email, username, password) => 
    dispatch({ type: 'REGISTER', payload: agent.Auth.register(email, username, password) }),
  onUnload: () => dispatch({ type: 'REGISTER_PAGE_UNLOAD' })
})

class Register extends Component {

  changeEmail = ev => this.props.onChangeEmail(ev.target.value)

  changeUsername = ev => this.props.onChangeUsername(ev.target.value)
  
  changePassword = ev => this.props.onChangePassword(ev.target.value)

  submitForm = (email, username, password) => ev => {
    ev.preventDefault()
    this.props.onSubmitForm(email, username, password)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const { email, username, password } = this.props 

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">
                Have an account?
              </Link>
            </p>
          </div>

          <ListErrors errors={this.props.errors} />

          <form onSubmit={this.submitForm(email, username, password)} >
            <fieldset>
              <fieldset className="form-group">
                <input 
                  className="form-control form-control-lg" 
                  type="email" 
                  placeholder="Email" 
                  value={email || ''} 
                  onChange={this.changeEmail}
                />
              </fieldset>

              <fieldset className="form-group">
                <input 
                  className="form-control form-control-lg" 
                  type="username" 
                  placeholder="Username" 
                  value={username || ''} 
                  onChange={this.changeUsername}
                />
              </fieldset>

              <fieldset className="form-group">
                <input 
                  className="form-control form-control-lg" 
                  type="password" 
                  placeholder="Password" 
                  value={password || ''} 
                  onChange={this.changePassword}
                />
              </fieldset>

              <button 
                type="submit" 
                className="btn btn-lg btn-primary pull-xs-right" 
                disabled={this.props.inProgress} 
              >
                Sign Up
              </button>

            </fieldset>
          </form>

        </div>
      </div>
    ) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

