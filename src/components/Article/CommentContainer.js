import React from 'react'
import { Link } from 'react-router-dom'
import ListErrors from '../ListErrors'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

const CommentContainer = (props) => {
  if (props.currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput {...props} />
        </div>

        <CommentList {...props}/>
      </div>
    )
  } else {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign In</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>
      </div>
    )
  }
}

export default CommentContainer
