import React from 'react'
import { Link } from 'react-router-dom'
import ArticleActions from './ArticleActions'

const ArticleMeta = (props) => {
  const { article: { author, createdAt } } = props

  return (
    <div className="article-meta">
      <Link to={`@${author.username}`}>
        <img src={author.image} alt="article author" />
      </Link>
      
      <div className="info">
        <Link to={`@${author.username}`} className="author">
          {author.username}
        </Link>
      </div>
      <span className="date">
        {new Date(createdAt).toDateString()}
      </span>
      
      <ArticleActions {...props} />
    </div>
  )
}

export default ArticleMeta
