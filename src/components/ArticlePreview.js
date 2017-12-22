import React from 'react'
import { Link } from 'react-router-dom'

const ArticlePreview = ({ article }) => (
  <div className="article-preview">
    <div className="article-meta">

      <Link to={`/profiles/${article.author.username}`}>
        <img src={article.author.image} alt="avatar" />
      </Link>

      <div className="pull-xs-right">
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i> {article.favoriteCount}
        </button>
      </div>

      <div className="info">
        <Link className="auhtor" to={`/profiles/${article.author.username}`}>
          {article.author.username}
        </Link>    
        <span className="date">{
          new Date(article.createdAt).toDateString()
        }</span>
      </div>

    </div>

    <Link to={`/articles/${article.slug}`} className="preview-link">
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Read more…</span>
      <ul className="tag-list">
        {
          article.tagList.map(tag => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))
        }
      </ul>
    </Link>
    
  </div>
)

export default ArticlePreview
