import React from 'react'
import Comment from './Comment'

const CommentList = (props) => (
  <div>
    {props.comments.map(comment => (
     <Comment 
      comment={comment}
      key={comment.id}
      currentUser={props.currentUser}
      slug={props.slug}
    /> 
    ))}
  </div>
)

export default CommentList
