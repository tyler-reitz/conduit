import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import agent from '../../agent'

const mapDispatchToProps = dispatch =>({
  onClickDelete: payload => dispatch({ type: 'DELETE_ARTICLE', payload  })
})

const ArticleActions = ({article, canModify, onClickDelete}) => {
  
  const del = () => onClickDelete(agent.Articles.del(article.slug))
  
  if (canModify) {
    return (
      <div>
        <Link 
          to={`/editor/${article.slug}`} 
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit"></i> Edit Article
        </Link>
        
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={del}
        >
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </div>
    )
  }

  return null
}


export default connect(
  () => ({}),
  mapDispatchToProps
)(ArticleActions)
