import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../../agent'

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: 'ADD_COMMENT', payload })
})

class CommentInput extends Component {
  
  state = {
    body: ''
  }
  
  createComment = ev => {
    ev.preventDefault()
    const { slug, onSubmit } = this.props
    const { body } = this.state
    const payload = agent.Comments.create(slug, { body })
    this.setState({ body: '' })
    onSubmit(payload)
  }
  
  render() {
    const { currentUser } = this.props
    const { body } = this.state

    return (
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
         <textarea
            className="form-control"
            placeholder="Write a comment…"
            value={body}
            onChange={ev => this.setState({ body: ev.target.value})}
            rows="">
          </textarea>
        </div>
        <div className="card-footer">
          <img 
            className="comment-author-img" 
            src={currentUser.image}
            alt="comment author"
          />
          <button 
            className="btn btn-primary btn-sm"
            type="submit"
          >
            Post Comment
          </button>
        </div>
      </form>
    )
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(CommentInput)
