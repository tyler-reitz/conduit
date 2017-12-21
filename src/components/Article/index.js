import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../../agent'
import marked from 'marked'

import ArticleMeta from './ArticleMeta'
import CommentContainer from './CommentContainer'

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ARTICLE_PAGE_LOAD', payload }),
  onUnload: () => dispatch({ type: 'ARTICLE_PAGE_UNLOAD' })
})

class Article extends Component {

  componentWillMount() {
    const { match: { params: { id }}} = this.props

    this.props.onLoad(Promise.all([
      agent.Articles.get(id),
      agent.Comments.forArticle(id)
    ]))
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const { article, currentUser, match } = this.props
    
    if (!article) {
      return null
    }
    
    const markup = { __html: marked(article.body) }
    const canModify = currentUser && currentUser.username === article.author.username

    return (
      <div className="article-page">
      
        <div className="banner">
          <div className="container">
          
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          
          </div>
        </div>
        
        <div className="container page">
          
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>
              <ul className="tag-list">
                {/*display article tags*/}
              </ul>
            </div>
          </div>
          
          <hr />
          
          <div className="article-actions"></div>
          
          <div className="row">
            <CommentContainer 
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={match.params.id}
              currentUser={currentUser} 
            />
          </div>
          
        </div>
        
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)
