import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import ListErrors from './ListErrors'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({ type: 'UPDATE_FIELD_AUTH', payload: { key: 'email', value } }),
  onChangePassword: value => dispatch({ type: 'UPDATE_FIELD_AUTH', payload: { key: 'password', value } }),
  onSubmit: (email, password) => dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: 'LOGIN_PAGE_UNLOAD' })
})

class Login extends Component {
  
  changeEmail = ev => this.props.onChangeEmail(ev.target.value)

  changePassword = ev => this.props.onChangePassword(ev.target.value)
  
  submitForm = (email, password) => ev => {
    ev.preventDefault()
    this.props.onSubmit(email, password)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }
  
  render() {
    const { email, password } = this.props
    
    return <div className="auth-page">
      <div className="container page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign In</h1>
          <p className="text-xs-center">
            <a>Need an account?</a>
          </p>
        </div>

        <ListErrors errors={this.props.errors} />

        <form onSubmit={this.submitForm(email, password)} >
          <fieldset>
            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="email" placeholder="Email" value={email || ''} onChange={this.changeEmail} />
            </fieldset>

            <fieldset className="form-group">
              <input className="form-control form-control-lg" type="password" placeholder="Password" value={password || ''} onChange={this.changePassword} />
            </fieldset>

            <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={this.props.inProgress} >
                Sign In
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
